'use client';

import { Container, Text, Group, Box, Stack } from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiFigma,
  SiNodedotjs,
  SiTailwindcss,
  SiVercel,
  SiGithub,
  SiAmazonwebservices,
  SiFirebase,
  SiAndroid,
  SiApple,
  SiKotlin,
  SiFlutter,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const tools: { icon: IconType; name: string; color: string }[] = [
  { icon: SiReact, name: 'React', color: '#61DAFB' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
  { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
  { icon: SiFigma, name: 'Figma', color: '#F24E1E' },
  { icon: SiVercel, name: 'Vercel', color: '#000000' },
  { icon: SiGithub, name: 'GitHub', color: '#181717' },
  { icon: SiAmazonwebservices, name: 'AWS', color: '#FF9900' },
  { icon: SiFirebase, name: 'Firebase', color: '#FFCA28' },
  { icon: SiAndroid, name: 'Android', color: '#3DDC84' },
  { icon: SiApple, name: 'Apple', color: '#000000' },
  { icon: SiKotlin, name: 'Kotlin Multiplatform', color: '#7F52FF' },
  { icon: SiFlutter, name: 'Flutter', color: '#02569B' },
];

function ToolIcon({ tool, index, isInView }: { tool: typeof tools[0]; index: number; isInView: boolean }) {
  const Icon = tool.icon;
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position (inverted for natural feel)
    const rotY = (mouseX / (rect.width / 2)) * 25;
    const rotX = -(mouseY / (rect.height / 2)) * 25;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Determine glow color (use white for dark colors)
  const glowColor = tool.color === '#000000' || tool.color === '#181717' 
    ? 'rgba(31, 79, 216, 0.6)' 
    : tool.color;

  return (
    <motion.div
      ref={iconRef}
      initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: 90 }}
      transition={{ delay: 0.3 + index * 0.05, duration: 0.5, type: 'spring', stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        cursor: 'pointer',
      }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.4 : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{ 
          duration: 0, // Immediate response
          scale: { duration: 0.15, ease: 'easeOut' },
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 16,
          borderRadius: 16,
          transformStyle: 'preserve-3d',
          background: isHovered 
            ? `radial-gradient(circle at 50% 50%, ${glowColor}15 0%, transparent 70%)`
            : 'transparent',
        }}
      >
        {/* Icon with 3D effect */}
        <motion.div
          animate={{
            color: isHovered ? tool.color : '#8A9BB8',
            filter: isHovered 
              ? `drop-shadow(0 0 20px ${glowColor}) drop-shadow(0 0 40px ${glowColor}80)`
              : 'none',
          }}
          transition={{ duration: 0 }}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)',
          }}
        >
          <Icon size={42} />
        </motion.div>

        {/* Tool name that appears on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10, rotateX: -90 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
            rotateX: isHovered ? 0 : -90,
          }}
          transition={{ duration: 0.15 }}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(15px)',
          }}
        >
          <Text
            size="xs"
            fw={600}
            ta="center"
            style={{ 
              color: tool.color === '#000000' || tool.color === '#181717' ? '#0A1A3F' : tool.color,
              whiteSpace: 'nowrap',
              textShadow: `0 0 10px ${glowColor}40`,
            }}
          >
            {tool.name}
          </Text>
        </motion.div>

        {/* Reflection/shine effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, transparent 100%)`,
            borderRadius: 16,
            pointerEvents: 'none',
            transformStyle: 'preserve-3d',
            transform: 'translateZ(25px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ToolStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <Box py={60} style={{ background: '#FFFFFF' }} ref={ref}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            p={{ base: 'xl', md: 50 }}
            style={{
              background: '#F8F9FB',
              borderRadius: 24,
              border: '1px solid rgba(10, 26, 63, 0.06)',
            }}
          >
            <Stack align="center" gap="xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Text
                  size="xs"
                  fw={600}
                  tt="uppercase"
                  style={{ color: '#8A9BB8', letterSpacing: '2px' }}
                >
                  Our Tool Stack
                </Text>
              </motion.div>

              <Group justify="center" gap={24} wrap="wrap" style={{ perspective: 1000 }}>
                {tools.map((tool, index) => (
                  <ToolIcon 
                    key={tool.name} 
                    tool={tool} 
                    index={index} 
                    isInView={isInView} 
                  />
                ))}
              </Group>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
