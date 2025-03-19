'use client';

import { useState, useEffect } from 'react';
import { initS3Client, listMP3Files, S3Object } from '../utils/s3';
import { getS3Config } from '../utils/config';

export default function S3FileList() {
  const [files, setFiles] = useState<S3Object[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFiles() {
      try {
        // Get the S3 configuration from environment variables
        const s3Config = getS3Config();

        // Validate that we have the required configuration
        if (!s3Config.accessKeyId || !s3Config.secretAccessKey || !s3Config.bucket) {
          throw new Error('Missing required S3 configuration. Please check your .env.local file.');
        }

        // Initialize the S3 client
        const s3Client = initS3Client(s3Config);

        // List the MP3 files
        const result = await listMP3Files(
          s3Client,
          s3Config.bucket,
          s3Config.prefix || ''
        );
        
        setFiles(result.files);
      } catch (err) {
        console.error('Error loading files:', err);
        setError(err instanceof Error ? err.message : 'Unknown error loading files');
      } finally {
        setLoading(false);
      }
    }

    loadFiles();
  }, []);

  if (loading) {
    return <div>Loading files...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (files.length === 0) {
    return <div>No MP3 files found in the bucket.</div>;
  }

  return (
    <div>
      <h2>MP3 Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.key}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
            <span> ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 