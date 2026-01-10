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
  title: 'Lucid Web Studios | Clarity in Digital Design',
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
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={dmSans.variable}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
