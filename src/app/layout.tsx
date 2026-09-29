import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')),
  title: 'Pintu Kumar | Full Stack Developer, AI & ML Engineer',
  description: 'Pintu Kumar — Full Stack Developer, AI Engineer and Machine Learning Engineer. Explore my projects in web development, generative AI, MLOps and data engineering.',
  openGraph: {
    title: 'Pintu Kumar | Full Stack Developer, AI & ML Engineer',
    description: 'Building intelligent applications from idea to deployment.',
    images: [{ url: '/pintu-kumar.jpg', width: 1088, height: 1226, alt: 'Pintu Kumar' }],
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
