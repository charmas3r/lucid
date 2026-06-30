import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Analytics } from '@vercel/analytics/next';
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
  metadataBase: new URL('https://www.lucidweb.studio'),
  title: {
    default: 'Escondido Web Development | Lucid Web Studios',
    template: '%s | Lucid Web Studios',
  },
  description:
    'Lucid Web Studios brings clarity to Escondido businesses with custom web design, development, mobile apps, and SEO. Fast, modern sites built to convert.',
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
        <Analytics />
      </body>
    </html>
  );
}
