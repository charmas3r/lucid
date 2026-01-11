'use client';

import {
  Container,
  Title,
  Text,
  Box,
  Stack,
  Badge,
} from '@mantine/core';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();
  
  // Get current date info
  const now = useMemo(() => new Date(), []);
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Calculate days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Calculate what day of week the 1st falls on (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Default to today
  const [selectedDay, setSelectedDay] = useState(currentDay - 1); // 0-indexed
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  // Check if a day is in the past
  const isDayPast = (dayIndex: number) => {
    return dayIndex + 1 < currentDay; // dayIndex is 0-indexed, currentDay is 1-indexed
  };

  // Check if a time slot is past (only relevant for today)
  const isTimePast = (timeString: string) => {
    if (selectedDay + 1 !== currentDay) return false; // Not today
    
    // Parse time like "4:30 PM"
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    // Compare with current time
    if (hour24 < currentHour) return true;
    if (hour24 === currentHour && minutes <= currentMinute) return true;
    return false;
  };

  const handleDaySelect = (dayIndex: number) => {
    if (!isDayPast(dayIndex)) {
      setSelectedDay(dayIndex);
    }
  };

  const handleTimeSelect = (time: string) => {
    if (isTimePast(time)) return;
    const date = `${monthNames[currentMonth]} ${selectedDay + 1}, ${currentYear}`;
    router.push(`/contact?date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}`);
  };

  return (
    <Box component="section" py={40} style={{ background: '#FFFFFF' }} ref={ref}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            py={80}
            px={{ base: 'xl', md: 60 }}
            style={{
              background: 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
              borderRadius: 32,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative elements */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                filter: 'blur(60px)',
              }}
            />
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                filter: 'blur(80px)',
              }}
            />

            <Stack align="center" gap="lg" style={{ position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge
                  size="lg"
                  radius="xl"
                  tt="uppercase"
                  fw={600}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                    padding: '10px 16px',
                  }}
                >
                  Let&apos;s Talk
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Title
                  order={2}
                  ta="center"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  Book a call today!
                </Title>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Text size="lg" ta="center" maw={500} style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Book a FREE discovery call to discuss your project and challenges
                  and find the best approach for executing it 👇
                </Text>
              </motion.div>

              {/* Calendar placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -5, boxShadow: '0 25px 70px rgba(10, 26, 63, 0.25)' }}
              >
                <Box
                  mt="xl"
                  p="xl"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 16,
                    width: '100%',
                    maxWidth: 400,
                    boxShadow: '0 20px 60px rgba(10, 26, 63, 0.2)',
                  }}
                >
                  <Stack gap="md">
                    <Text fw={600} style={{ color: '#0A1A3F' }}>
                      {monthNames[currentMonth]} {currentYear}
                    </Text>
                    <Box
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: 8,
                        textAlign: 'center',
                      }}
                    >
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                        <Text key={day} size="xs" fw={500} style={{ color: '#8A9BB8' }}>
                          {day}
                        </Text>
                      ))}
                      {/* Add empty cells for days before the 1st of the month */}
                      {[...Array(firstDayOfMonth)].map((_, i) => (
                        <Box key={`empty-${i}`} />
                      ))}
                      {[...Array(daysInMonth)].map((_, i) => {
                        const isPast = isDayPast(i);
                        return (
                          <motion.div
                            key={i}
                            whileHover={!isPast ? { scale: 1.15 } : undefined}
                            whileTap={!isPast ? { scale: 0.95 } : undefined}
                            onClick={() => handleDaySelect(i)}
                            style={{
                              padding: 8,
                              borderRadius: 8,
                              cursor: isPast ? 'not-allowed' : 'pointer',
                              background:
                                selectedDay === i
                                  ? 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)'
                                  : 'transparent',
                              color: isPast 
                                ? '#C9D2E3' 
                                : selectedDay === i 
                                  ? '#FFFFFF' 
                                  : '#5A7099',
                              fontSize: '0.875rem',
                              boxShadow: selectedDay === i ? '0 4px 15px rgba(31, 79, 216, 0.3)' : 'none',
                              opacity: isPast ? 0.5 : 1,
                              textDecoration: isPast ? 'line-through' : 'none',
                            }}
                          >
                            {i + 1}
                          </motion.div>
                        );
                      })}
                    </Box>

                    <Box mt="md">
                      <Text size="sm" mb="xs" style={{ color: '#8A9BB8' }}>
                        Available times:
                      </Text>
                      {['4:30 PM', '5:00 PM', '5:30 PM'].map((time) => {
                        const isPast = isTimePast(time);
                        return (
                          <motion.div
                            key={time}
                            whileHover={!isPast ? { scale: 1.02 } : undefined}
                            whileTap={!isPast ? { scale: 0.98 } : undefined}
                            onHoverStart={() => !isPast && setHoveredTime(time)}
                            onHoverEnd={() => setHoveredTime(null)}
                            onClick={() => handleTimeSelect(time)}
                          >
                            <Box
                              p="sm"
                              mb="xs"
                              style={{
                                background: isPast
                                  ? 'rgba(138, 155, 184, 0.1)'
                                  : hoveredTime === time 
                                    ? 'rgba(31, 79, 216, 0.1)' 
                                    : 'rgba(31, 79, 216, 0.05)',
                                borderRadius: 8,
                                textAlign: 'center',
                                cursor: isPast ? 'not-allowed' : 'pointer',
                                border: `1px solid ${isPast
                                  ? 'rgba(138, 155, 184, 0.15)'
                                  : hoveredTime === time 
                                    ? 'rgba(31, 79, 216, 0.2)' 
                                    : 'rgba(31, 79, 216, 0.1)'}`,
                                transition: 'all 0.2s ease',
                                opacity: isPast ? 0.5 : 1,
                              }}
                            >
                              <Text 
                                size="sm" 
                                style={{ 
                                  color: isPast ? '#8A9BB8' : '#1F4FD8',
                                  textDecoration: isPast ? 'line-through' : 'none',
                                }}
                              >
                                {time}
                              </Text>
                            </Box>
                          </motion.div>
                        );
                      })}
                    </Box>
                  </Stack>
                </Box>
              </motion.div>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
