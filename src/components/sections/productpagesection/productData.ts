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
    name: "Briko",
    status: "In Progress",
    description:
      "A complete platform for discovering and purchasing real estate.",
    features: [
      "Property Listings",
      "Land & Apartments",
      "Member Verification",
      "Admin Dashboard",
    ],
  },
  {
    name: "Bandlex",
    status: "In Progress",
    description:
      "Master IELTS vocabulary through deeper learning and daily practice.",
    features: [
      "Bangla Meanings",
      "Paraphrasing",
      "Sentence Building",
      "Daily Vocabulary",
      "Smart Practice",
    ],
  },
  {
    name: "Mental Coach",
    status: "In Progress",
    description:
      "AI-assisted coaching for mental wellness and personal growth.",
    features: [
      "AI Coaching",
      "Mental Wellness",
      "Self-Reflection",
      "Personal Growth",
    ],
  },
  {
    name: "Worko",
    status: "In Development",
    description:
      "An AI fitness coach for personalized workouts and better form.",
    features: [
      "AI Fitness Coach",
      "Pose Detection",
      "Workout Plans",
      "Progress Tracking",
    ],
  },
  {
    name: "Medifamily",
    status: "In Development",
    description:
      "Manage medications and stay on track with timely reminders.",
    features: [
      "Medicine Reminders",
      "Medication Schedule",
      "Daily Notifications",
    ],
  },
  {
    name: "Lumiq",
    status: "In Development",
    description:
      "Optimize Android storage and keep your device clutter-free.",
    features: [
      "Junk Cleanup",
      "Storage Optimization",
      "Device Cleanup",
    ],
  },
];
