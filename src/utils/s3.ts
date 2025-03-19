import { 
  S3Client, 
  ListObjectsV2Command,
  GetObjectCommand,
  ListObjectsV2CommandInput
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface S3Credentials {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  prefix?: string;
}

export interface S3Object {
  key: string;
  size: number;
  lastModified: Date;
  url: string;
  name: string;
}

export const initS3Client = (credentials: S3Credentials): S3Client => {
  return new S3Client({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
    forcePathStyle: false, // This is important for proper URL construction
    endpoint: `https://s3.${credentials.region}.amazonaws.com`,
  });
};

export const listMP3Files = async (
  s3Client: S3Client,
  bucket: string,
  prefix: string = '',
  continuationToken?: string
): Promise<{ files: S3Object[], nextContinuationToken?: string }> => {
  try {
    const params: ListObjectsV2CommandInput = {
      Bucket: bucket,
      Prefix: prefix,
      MaxKeys: 100,
      ContinuationToken: continuationToken,
    };

    const command = new ListObjectsV2Command(params);
    const response = await s3Client.send(command);

    const mp3Files = await Promise.all(
      (response.Contents || [])
        .filter(item => item.Key && item.Key.toLowerCase().endsWith('.mp3'))
        .map(async item => {
          const key = item.Key!;
          const fileName = key.split('/').pop() || key;
          
          // Generate a pre-signed URL for the MP3 file
          const getObjectCommand = new GetObjectCommand({
            Bucket: bucket,
            Key: key,
          });
          
          const url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });
          
          return {
            key,
            size: item.Size || 0,
            lastModified: item.LastModified || new Date(),
            url,
            name: fileName,
          };
        })
    );

    return {
      files: mp3Files,
      nextContinuationToken: response.NextContinuationToken,
    };
  } catch (error) {
    console.error('Error listing MP3 files:', error);
    throw error;
  }
};
