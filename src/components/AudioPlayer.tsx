import React from 'react';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
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
          customProgressBarSection={[
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.CURRENT_TIME,
            RHAP_UI.DURATION
          ]}
          customControlsSection={[
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS
          ]}
          autoPlayAfterSrcChange={true}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;