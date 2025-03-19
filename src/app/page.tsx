'use client';

import React, { useState, useEffect } from 'react';
import { S3Client } from '@aws-sdk/client-s3';
import Header from '@/components/Header';
import MP3List from '@/components/MP3List';
import AudioPlayer from '@/components/AudioPlayer';
import { initS3Client, listMP3Files } from '@/utils/s3';
import { getS3Config } from '@/utils/config';

interface S3Object {
  key: string;
  size: number;
  lastModified: Date;
  url: string;
  name: string;
}

export default function Home() {
  const [s3Client, setS3Client] = useState<S3Client | null>(null);
  const [mp3Files, setMp3Files] = useState<S3Object[]>([]);
  const [currentFile, setCurrentFile] = useState<S3Object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [continuationToken, setContinuationToken] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const connectToS3 = async () => {
      try {
        const config = getS3Config();
        
        // Check if we have all required credentials
        if (!config.accessKeyId || !config.secretAccessKey || !config.bucket) {
          throw new Error('Missing required S3 configuration. Please check your .env.local file.');
        }
        
        // Initialize S3 client
        const client = initS3Client(config);
        setS3Client(client);
        
        // List MP3 files
        const result = await listMP3Files(client, config.bucket, config.prefix || '');
        setMp3Files(result.files);
        setContinuationToken(result.nextContinuationToken);
        setHasMore(!!result.nextContinuationToken);
      } catch (err) {
        console.error('Connection error:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect to S3');
      } finally {
        setIsLoading(false);
      }
    };
    
    connectToS3();
  }, []);

  const handleLoadMore = async () => {
    if (!s3Client || !continuationToken) return;
    
    try {
      setIsLoading(true);
      const config = getS3Config();
      
      const result = await listMP3Files(
        s3Client,
        config.bucket,
        config.prefix || '',
        continuationToken
      );
      
      setMp3Files((prev) => [...prev, ...result.files]);
      setContinuationToken(result.nextContinuationToken);
      setHasMore(!!result.nextContinuationToken);
    } catch (err) {
      console.error('Error loading more files:', err);
      setError('Failed to load more files.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlay = (file: S3Object) => {
    setCurrentFile(file);
  };

  if (isLoading && mp3Files.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header isConnected={!!s3Client} onDisconnect={undefined} />
      
      <div className="container mx-auto px-4 py-8">
        <div>
          {currentFile && (
            <AudioPlayer src={currentFile.url} fileName={currentFile.name} />
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">MP3 Files</h2>
            </div>
            <MP3List
              files={mp3Files}
              onPlay={handlePlay}
              currentFile={currentFile}
              isLoading={isLoading}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          </div>
        </div>
      </div>
    </main>
  );
}