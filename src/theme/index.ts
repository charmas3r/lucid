'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

// Metallic Blue color scale
const metallic: MantineColorsTuple = [
  '#E8F0FF',  // 0 - lightest
  '#C9D2E3',  // 1 - silver/muted
  '#A5B4CF',  // 2
  '#7A94BA',  // 3
  '#4DA3FF',  // 4 - electric blue (accent)
  '#3A6EA5',  // 5 - steel blue (secondary)
  '#1F4FD8',  // 6 - primary metallic blue
  '#0A1A3F',  // 7 - deep navy (text)
  '#0B1020',  // 8 - dark text
  '#060810',  // 9 - darkest
];

// Navy scale for accents
const navy: MantineColorsTuple = [
  '#E8EDF5',
  '#C9D2E3',
  '#8A9BB8',
  '#5A7099',
  '#3A6EA5',
  '#1F4FD8',
  '#0A1A3F',
  '#0B1020',
  '#080C18',
  '#040610',
];

export const theme = createTheme({
  primaryColor: 'metallic',
  colors: {
    metallic,
    navy,
  },
  fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'lg',
  cursorType: 'pointer',
  white: '#FFFFFF',
  black: '#0A1A3F',
});
