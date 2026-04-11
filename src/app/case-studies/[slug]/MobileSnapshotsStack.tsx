'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Box } from '@mantine/core';

export interface MobileSnapshot {
  url: string;
  alt: string;
}

interface MobileSnapshotsStackProps {
  snapshots: MobileSnapshot[];
  inView: boolean;
}

// Phone dimensions (displayed size, not source image size)
const PHONE_WIDTH = 280;
const PHONE_HEIGHT = 600;
const PHONE_RADIUS = 40;

// Fan layout: per-index rotation (deg) and offset (px) for counts 1, 2, 3
// Later indices render on top (higher z-index).
const FAN_LAYOUTS: Record<number, Array<{ rotate: number; x: number; y: number }>> = {
  1: [
    { rotate: 0, x: 0, y: 0 },
  ],
  2: [
    { rotate: -6, x: -60, y: 0 },
    { rotate: 4, x: 60, y: 0 },
  ],
  3: [
    { rotate: -10, x: -50, y: -20 },
    { rotate: 0, x: 0, y: 0 },
    { rotate: 8, x: 50, y: -20 },
  ],
};

function PhoneFrame({
  url,
  alt,
  width = PHONE_WIDTH,
  height = PHONE_HEIGHT,
}: {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <Box
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: PHONE_RADIUS,
        padding: 6,
        background: 'linear-gradient(135deg, rgba(77, 163, 255, 0.6) 0%, rgba(31, 79, 216, 0.6) 100%)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35), 0 10px 30px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Inner screen */}
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: PHONE_RADIUS - 6,
          overflow: 'hidden',
          background: '#000',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        <Image
          src={url}
          alt={alt}
          fill
          sizes={`${width}px`}
          style={{ objectFit: 'cover' }}
        />
        {/* Notch bar */}
        <Box
          style={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 22,
            borderRadius: 12,
            background: '#000',
            zIndex: 2,
          }}
        />
      </Box>
    </Box>
  );
}

export function MobileSnapshotsStack({ snapshots, inView }: MobileSnapshotsStackProps) {
  const items = snapshots.slice(0, 3);
  const count = items.length;
  if (count === 0) return null;

  const layout = FAN_LAYOUTS[count];

  return (
    <Box
      className="mobile-snapshots-stack"
      style={{
        position: 'relative',
        width: '100%',
        height: 640,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {items.map((snap, index) => {
        const { rotate, x, y } = layout[index];
        const isFrontPhone = index === count - 1;

        return (
          <motion.div
            key={`${snap.url}-${index}`}
            className={isFrontPhone ? 'mobile-snapshot-front' : 'mobile-snapshot-back'}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={inView ? { opacity: 1, y, rotate } : { opacity: 0, y: 40, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              marginLeft: -(PHONE_WIDTH / 2) + x,
              marginTop: -(PHONE_HEIGHT / 2),
              zIndex: index + 1,
              transformOrigin: 'center center',
            }}
          >
            <PhoneFrame url={snap.url} alt={snap.alt} />
          </motion.div>
        );
      })}

      {/* Responsive scaling and base-breakpoint collapse */}
      <style jsx>{`
        @media (max-width: 1199px) and (min-width: 768px) {
          .mobile-snapshots-stack :global(.mobile-snapshot-front),
          .mobile-snapshots-stack :global(.mobile-snapshot-back) {
            transform-origin: center center;
            zoom: 0.75;
          }
        }
        @media (max-width: 767px) {
          .mobile-snapshots-stack {
            height: 520px !important;
          }
          .mobile-snapshots-stack :global(.mobile-snapshot-back) {
            display: none;
          }
        }
      `}</style>
    </Box>
  );
}
