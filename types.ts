import React from 'react';

export interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export interface LoreCardProps {
  title: string;
  description: string;
  image?: string;
  delay?: number;
}