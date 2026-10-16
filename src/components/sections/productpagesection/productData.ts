import deepFocusLogo from '@/assets/products/deepfocus.png';
import maxDriveLogo from '@/assets/products/maxdrive.png';
import deepFocusPreview from '@/assets/products/deep-focus/10.png';
import maxDrivePreview from '@/assets/maxdrive/image-1.png';

export interface Product {
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  preview: string;
  href: string;
  accent: string;
  features: string[];
  detailFeatures?: { title: string; description: string }[];
  actionLabel: string;
  googlePlayUrl?: string;
}

export const products: Product[] = [
  {
    name: 'DeepFocus',
    category: 'Productivity · Android',
    tagline: 'Make room for deep work.',
    description:
      'A focused workspace for building better routines, tracking your progress, and making every session count.',
    image: deepFocusLogo,
    preview: deepFocusPreview,
    href: '/deep-focus',
    googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.sanzox.deepfocus',
    accent: '#7657ff',
    actionLabel: 'Explore DeepFocus',
    features: ['Focus Sessions', '21-Day Challenge', 'Track Your Progress', 'Plan Better'],
    detailFeatures: [
      { title: 'Focus Sessions', description: 'Customizable Pomodoro timer and focus modes.' },
      { title: '21-Day Challenge', description: 'Build consistent habits with daily goals.' },
      { title: 'Track Your Progress', description: 'Visual insights, streaks, and weekly reports.' },
      { title: 'Plan Better', description: 'Smart planning for a more productive day.' },
    ],
  },
  {
    name: 'MaxDrive',
    category: 'Storage · Android',
    tagline: 'One storage. Endless space.',
    description:
      'Bring your cloud accounts together and manage, organize, and access your files from one place.',
    image: maxDriveLogo,
    preview: maxDrivePreview,
    href: 'https://www.maxdrive.site',
    googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.sanzox.maxdrive',
    accent: '#1687ff',
    actionLabel: 'Explore MaxDrive',
    features: ['Multiple Drive Support', 'Smart Organization', 'Secure & Reliable', 'Cross-Platform'],
    detailFeatures: [
      { title: 'Multiple Drive Support', description: 'Connect Google Drive, Dropbox, OneDrive, and iCloud.' },
      { title: 'Smart Organization', description: 'Keep files, folders, and quick search in one place.' },
      { title: 'Secure & Reliable', description: 'Your data stays in your control.' },
    ],
  },
];

export const roadmapItems = [
  {
    name: 'LearnFlow',
    icon: 'book',
    status: 'In Development',
    description: 'Personalized learning paths with AI recommendations to help you learn faster and smarter.',
    accent: '#ffc65c',
  },
  {
    name: 'HabitSync',
    icon: 'sparkles',
    status: 'Coming Soon',
    description: 'Build better habits with smart tracking, gentle reminders, and positive reinforcement.',
    accent: '#8a7bff',
  },
  {
    name: 'AutoTask',
    icon: 'workflow',
    status: 'In Development',
    description: 'Automate repetitive tasks with AI-powered workflows and integrations.',
    accent: '#2da8ff',
  },
];
