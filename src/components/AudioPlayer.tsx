import React from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface AudioPlayerProps {
  src: string;
  fileName: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, fileName }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 my-4">
      <h3 className="text-lg font-medium mb-2 truncate text-gray-900 dark:text-white">
        {fileName}
      </h3>
      <div className="audio-player-container">
        <H5AudioPlayer
          src={src}
          autoPlay
          showJumpControls={true}
          layout="stacked"
          customProgressBarSection={["PROGRESS_BAR", "CURRENT_TIME", "DURATION"]}
          customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
          autoPlayAfterSrcChange={true}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;