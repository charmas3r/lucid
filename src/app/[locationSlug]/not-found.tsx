'use client';

import Link from 'next/link';
import { Container, Title, Text, Button, Box } from '@mantine/core';
import { Navigation, Footer } from '@/components';

export default function LocationNotFound() {
  return (
    <>
      <Navigation />
      <main>
        <Box
          component="section"
          py={160}
          style={{
            background: 'linear-gradient(180deg, #0A1A3F 0%, #081430 100%)',
            minHeight: '60vh',
          }}
        >
          <Container size="md" ta="center">
            <Title order={1} style={{ color: '#FFFFFF', marginBottom: 16 }}>
              City not found
            </Title>
            <Text size="lg" style={{ color: '#A5B4CF', marginBottom: 32 }}>
              We don&apos;t have a dedicated page for that city yet. Check our full
              service area or get in touch.
            </Text>
            <Button component={Link} href="/service-areas" size="lg">
              See Service Areas
            </Button>
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
}
