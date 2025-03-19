# S3 MP3 Browser

A modern, responsive React application for browsing and playing MP3 files stored in an Amazon S3 bucket.

## Features

- Connect to any S3 bucket using AWS credentials
- Browse MP3 files with optional folder path filtering
- View file details (name, size, last modified date)
- Stream and play MP3 files directly from S3
- Responsive design that works well on desktop and mobile devices
- Modern UI with light/dark mode support
- Secure handling of AWS credentials (session-only)

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-javascript/) - AWS S3 integration
- [React H5 Audio Player](https://github.com/lhz516/react-h5-audio-player) - Audio playback component
- [React Icons](https://react-icons.github.io/react-icons/) - Icon components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- AWS S3 bucket with MP3 files
- AWS access credentials (Access Key ID and Secret Access Key)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jukebox-s3.git
cd jukebox-s3
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Deployment

#### GitHub Pages

1. Update `next.config.js` with your repository name if deploying to GitHub Pages:
```js
const nextConfig = {
  // ...
  basePath: '/your-repo-name',
  // ...
}
```

2. Build and export the application:
```bash
npm run build
# or
yarn build
```

3. Deploy the `out` directory to GitHub Pages.

#### Vercel

1. Push your code to a GitHub repository.

2. Import the project into Vercel.

3. Vercel will automatically detect Next.js and deploy your application.

## S3 Bucket Configuration

For security reasons, you may need to configure CORS settings on your S3 bucket to allow access from your application. Add the following CORS configuration to your S3 bucket:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

For production, replace `"AllowedOrigins": ["*"]` with your specific domain.

## Security Considerations

- This application uses client-side authentication to AWS S3
- Credentials are stored in memory only and not persisted
- Pre-signed URLs are generated with expiration times
- For production use, consider implementing additional security measures:
  - Using AWS Cognito or similar for user authentication
  - Setting up a backend proxy for S3 access
  - Implementing stricter CORS policies

## License

MIT