import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/theme';
import '@mantine/core/styles.css';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap', // Prevent font blocking
  preload: true,
});

export const metadata: Metadata = {
  title: 'Web Development Company in San Diego | Custom Websites',
  description:
    'Bringing clarity to local businesses through exceptional website design, development, mobile apps, and SEO. Transform your digital presence with Lucid Web Studios.',
  keywords: [
    'web design',
    'web development',
    'mobile development',
    'SEO',
    'digital agency',
    'website design',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        {/* Favicons */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3373E9" />
        {/* Umami Analytics */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="ae124929-f7d4-40d9-9ff4-07df58658a41"
        />
      </head>
      <body className={dmSans.variable}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
