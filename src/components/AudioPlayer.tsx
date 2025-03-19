import React, { useRef, useState } from 'react';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FaFastForward, FaDownload } from 'react-icons/fa';

interface AudioPlayerProps {
  src: string;
  fileName: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, fileName }) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<H5AudioPlayer>(null);

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackRate(newSpeed);
    
    if (audioRef.current?.audio?.current) {
      audioRef.current.audio.current.playbackRate = newSpeed;
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = src;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-2">
      <div className="max-w-7xl mx-auto">
        <H5AudioPlayer
          ref={audioRef}
          src={src}
          autoPlay
          customProgressBarSection={[
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.DURATION,
          ]}
          customControlsSection={[
            RHAP_UI.MAIN_CONTROLS,
            <div key="file-info" className="rhap_additional-controls ml-2 text-sm">
              <span className="text-gray-900 dark:text-gray-900 truncate max-w-xs inline-block">
                {fileName}
              </span>
            </div>,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
          customAdditionalControls={[
            <button
              key="speed-control"
              onClick={handleSpeedChange}
              className="rhap_button-clear rhap_volume-button flex items-center px-2"
              title="Change playback speed"
            >
              <FaFastForward className="mr-1" />
              <span className="text-sm">{playbackRate}x</span>
            </button>,
            <button
              key="download-button"
              onClick={handleDownload}
              className="rhap_button-clear rhap_volume-button flex items-center px-2"
              title="Download MP3"
            >
              <FaDownload />
            </button>
          ]}
          layout="stacked"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;