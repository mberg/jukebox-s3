import React, { useState, useEffect } from 'react';

interface S3CredentialsProps {
  onConnect: (credentials: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
    prefix: string;
  }) => void;
  isLoading: boolean;
  error: string | null;
}

const S3Credentials: React.FC<S3CredentialsProps> = ({ onConnect, isLoading, error }) => {
  const [credentials, setCredentials] = useState({
    accessKeyId: '',
    secretAccessKey: '',
    region: 'us-east-1',
    bucket: '',
    prefix: '',
  });

  // Load credentials from environment variables on component mount
  useEffect(() => {
    setCredentials({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      bucket: process.env.NEXT_PUBLIC_S3_BUCKET || '',
      prefix: process.env.NEXT_PUBLIC_S3_PREFIX || '',
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(credentials);
  };

  return (
    <div className="p-4 bg-white dark:bg-darkBg rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Connect to S3 Bucket</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="accessKeyId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Access Key ID
          </label>
          <input
            type="text"
            id="accessKeyId"
            name="accessKeyId"
            value={credentials.accessKeyId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="secretAccessKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Secret Access Key
          </label>
          <input
            type="password"
            id="secretAccessKey"
            name="secretAccessKey"
            value={credentials.secretAccessKey}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Region
          </label>
          <select
            id="region"
            name="region"
            value={credentials.region}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
          >
            <option value="us-east-1">US East (N. Virginia)</option>
            <option value="us-east-2">US East (Ohio)</option>
            <option value="us-west-1">US West (N. California)</option>
            <option value="us-west-2">US West (Oregon)</option>
            <option value="af-south-1">Africa (Cape Town)</option>
            <option value="ap-east-1">Asia Pacific (Hong Kong)</option>
            <option value="ap-south-1">Asia Pacific (Mumbai)</option>
            <option value="ap-northeast-3">Asia Pacific (Osaka)</option>
            <option value="ap-northeast-2">Asia Pacific (Seoul)</option>
            <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
            <option value="ap-southeast-2">Asia Pacific (Sydney)</option>
            <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
            <option value="ca-central-1">Canada (Central)</option>
            <option value="eu-central-1">Europe (Frankfurt)</option>
            <option value="eu-west-1">Europe (Ireland)</option>
            <option value="eu-west-2">Europe (London)</option>
            <option value="eu-south-1">Europe (Milan)</option>
            <option value="eu-west-3">Europe (Paris)</option>
            <option value="eu-north-1">Europe (Stockholm)</option>
            <option value="me-south-1">Middle East (Bahrain)</option>
            <option value="sa-east-1">South America (São Paulo)</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="bucket" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Bucket Name
          </label>
          <input
            type="text"
            id="bucket"
            name="bucket"
            value={credentials.bucket}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="prefix" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Folder Path (Optional)
          </label>
          <input
            type="text"
            id="prefix"
            name="prefix"
            value={credentials.prefix}
            onChange={handleChange}
            placeholder="e.g., music/2023/"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default S3Credentials;