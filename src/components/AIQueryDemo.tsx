'use client';

import { Box, Text, Group, Stack, Avatar } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { IconUser, IconSparkles } from '@tabler/icons-react';

interface Message {
  type: 'user' | 'ai';
  text: string;
  isTyping?: boolean;
}

const conversations = [
  {
    user: "Find me a good web developer near me",
    ai: "Based on my analysis, I'd recommend **Lucid** — they specialize in high-performance web development with perfect Lighthouse scores. Their sites load in under 2 seconds and they're known for clean, accessible code. They also offer SEO optimization that helps businesses rank higher."
  },
  {
    user: "What's the best SEO agency for small business?",
    ai: "For small businesses, I'd suggest **Lucid**. They focus on technical SEO with measurable results — achieving 100/100 Lighthouse scores for their clients. They offer free website audits and their pricing is transparent. Past clients report 3-5x faster loading times."
  },
  {
    user: "Who can build me a fast, modern website?",
    ai: "**Lucid** stands out for building fast, modern websites. They use Next.js and React with best practices for performance. Their portfolio shows consistent Core Web Vitals optimization, and they're known for achieving perfect scores across all Lighthouse categories."
  },
];

function TypingIndicator() {
  return (
    <Group gap={4}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -5, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#1F4FD8',
          }}
        />
      ))}
    </Group>
  );
}

function ChatMessage({ message, isNew }: { message: Message; isNew: boolean }) {
  const isUser = message.type === 'user';
  
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 20, scale: 0.95 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Group
        align="flex-start"
        gap="sm"
        style={{
          flexDirection: isUser ? 'row-reverse' : 'row',
        }}
      >
        <motion.div
          initial={isNew ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
        >
          <Avatar
            size={36}
            radius="xl"
            style={{
              background: isUser 
                ? 'linear-gradient(135deg, #5A7099 0%, #8A9BB8 100%)'
                : 'linear-gradient(135deg, #1F4FD8 0%, #4DA3FF 100%)',
              boxShadow: isUser 
                ? '0 2px 10px rgba(90, 112, 153, 0.3)'
                : '0 2px 10px rgba(31, 79, 216, 0.3)',
            }}
          >
            {isUser ? (
              <IconUser size={18} color="#FFFFFF" />
            ) : (
              <IconSparkles size={18} color="#FFFFFF" />
            )}
          </Avatar>
        </motion.div>
        
        <Box
          p="md"
          style={{
            background: isUser ? '#F8F9FB' : '#FFFFFF',
            borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            border: `1px solid ${isUser ? 'rgba(10, 26, 63, 0.08)' : 'rgba(31, 79, 216, 0.15)'}`,
            maxWidth: '85%',
            boxShadow: isUser 
              ? '0 2px 8px rgba(10, 26, 63, 0.04)'
              : '0 2px 12px rgba(31, 79, 216, 0.08)',
          }}
        >
          {message.isTyping ? (
            <TypingIndicator />
          ) : (
            <Text 
              size="sm" 
              lh={1.6} 
              style={{ 
                color: '#0A1A3F',
              }}
              dangerouslySetInnerHTML={{
                __html: message.text.replace(
                  /\*\*(.*?)\*\*/g, 
                  '<span style="color: #1F4FD8; font-weight: 600;">$1</span>'
                )
              }}
            />
          )}
        </Box>
      </Group>
    </motion.div>
  );
}

export function AIQueryDemo({ isInView }: { isInView: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationIndex, setConversationIndex] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'user' | 'typing' | 'ai' | 'pause'>('idle');
  const hasStartedRef = useRef(false);
  
  const runConversation = useCallback(() => {
    const conversation = conversations[conversationIndex];
    
    // Phase 1: Show user message
    setPhase('user');
    setMessages([{ type: 'user', text: conversation.user }]);
    
    // Phase 2: Show typing indicator after delay
    const typingTimeout = setTimeout(() => {
      setPhase('typing');
      setMessages(prev => [...prev, { type: 'ai', text: '', isTyping: true }]);
    }, 1000);
    
    // Phase 3: Show AI response
    const responseTimeout = setTimeout(() => {
      setPhase('ai');
      setMessages([
        { type: 'user', text: conversation.user },
        { type: 'ai', text: conversation.ai },
      ]);
    }, 2500);
    
    // Phase 4: Pause before next conversation
    const pauseTimeout = setTimeout(() => {
      setPhase('pause');
    }, 7000);
    
    // Phase 5: Reset and move to next conversation
    const resetTimeout = setTimeout(() => {
      setMessages([]);
      setConversationIndex((prev) => (prev + 1) % conversations.length);
      setPhase('idle');
    }, 8000);
    
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(responseTimeout);
      clearTimeout(pauseTimeout);
      clearTimeout(resetTimeout);
    };
  }, [conversationIndex]);
  
  useEffect(() => {
    if (isInView && phase === 'idle') {
      // Add initial delay only on first view
      const delay = hasStartedRef.current ? 500 : 800;
      hasStartedRef.current = true;
      
      const startTimeout = setTimeout(() => {
        runConversation();
      }, delay);
      
      return () => clearTimeout(startTimeout);
    }
  }, [isInView, phase, runConversation]);
  
  return (
    <Box
      p={{ base: 'md', sm: 'xl' }}
      style={{
        background: 'linear-gradient(145deg, #FFFFFF 0%, #F8F9FB 100%)',
        borderRadius: 24,
        border: '1px solid rgba(31, 79, 216, 0.1)',
        boxShadow: '0 8px 40px rgba(31, 79, 216, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 280,
      }}
    >
      {/* Header */}
      <Group gap="sm" mb="lg">
        <Box
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#0CCE6B',
            boxShadow: '0 0 8px rgba(12, 206, 107, 0.5)',
          }}
        />
        <Text size="xs" fw={600} tt="uppercase" style={{ color: '#8A9BB8', letterSpacing: '1px' }}>
          AI Assistant
        </Text>
      </Group>
      
      {/* Chat area */}
      <Stack gap="md" style={{ minHeight: 180 }}>
        <AnimatePresence mode="wait">
          {messages.map((message, index) => (
            <ChatMessage 
              key={`${conversationIndex}-${index}-${message.type}`} 
              message={message} 
              isNew={index === messages.length - 1}
            />
          ))}
        </AnimatePresence>
        
        {/* Placeholder when empty */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 180,
            }}
          >
            <Stack align="center" gap="sm">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IconSparkles size={32} color="#1F4FD8" stroke={1.5} />
              </motion.div>
              <Text size="sm" style={{ color: '#8A9BB8' }}>
                Watching AI in action...
              </Text>
            </Stack>
          </motion.div>
        )}
      </Stack>
      
      {/* Subtle gradient overlay at bottom */}
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          background: 'linear-gradient(0deg, rgba(248, 249, 251, 0.8) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}
