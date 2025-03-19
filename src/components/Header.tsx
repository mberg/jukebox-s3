import React from 'react';
import { FaMusic } from 'react-icons/fa';

interface HeaderProps {
  onDisconnect?: () => void;
  isConnected?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onDisconnect, isConnected }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-3 sm:mb-0">
          <FaMusic className="text-2xl mr-2" />
          <h1 className="text-xl font-bold">S3 Jukebox</h1>
        </div>
        
        {isConnected && onDisconnect && (
          <button
            onClick={onDisconnect}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow transition duration-200"
          >
            Disconnect
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;