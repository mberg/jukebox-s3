// Environment variable utilities
// Get environment variables with fallbacks
export const getEnvVariable = (key: string, defaultValue: string = ''): string => {
  if (typeof window !== 'undefined') {
    return (process.env[`NEXT_PUBLIC_${key}`] || defaultValue);
  }
  return defaultValue;
};

