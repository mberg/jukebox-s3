import { S3Credentials } from './s3';

export const getS3Config = (): S3Credentials => {
  return {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    bucket: process.env.NEXT_PUBLIC_S3_BUCKET || '',
    prefix: process.env.NEXT_PUBLIC_S3_PREFIX,
  };
}; 