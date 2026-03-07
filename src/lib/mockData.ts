export interface Document {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'link' | 'image' | 'video' | 'figma' | 'notion' | 'doc';
  url: string;
  thumbnail?: string;
  uploadDate: string;
  clicks: number;
  isActive: boolean;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
  username: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export const mockUser: UserProfile = {
  name: 'Alex Morgan',
  bio: 'Product Designer & Creative Developer. Sharing my work, resources, and favorite links.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  username: '@alexmorgan',
  socialLinks: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  }
};

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Resume 2024',
    description: 'My latest professional resume with experience and skills',
    type: 'pdf',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
    uploadDate: new Date().toISOString(),
    clicks: 234,
    isActive: true,
  },
  {
    id: '2',
    title: 'Portfolio Website',
    description: 'Check out my complete design portfolio',
    type: 'link',
    url: 'https://example.com',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    uploadDate: new Date().toISOString(),
    clicks: 567,
    isActive: true,
  },
  {
    id: '3',
    title: 'Design System',
    description: 'Figma design system for modern web apps',
    type: 'figma',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    uploadDate: new Date().toISOString(),
    clicks: 892,
    isActive: true,
  },
  {
    id: '4',
    title: 'Project Case Study',
    description: 'Detailed breakdown of my latest UX project',
    type: 'notion',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&h=300&fit=crop',
    uploadDate: new Date().toISOString(),
    clicks: 445,
    isActive: true,
  },
  {
    id: '5',
    title: 'UI Inspiration',
    description: 'Collection of beautiful UI designs and patterns',
    type: 'image',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop',
    uploadDate: new Date().toISOString(),
    clicks: 1203,
    isActive: true,
  },
  {
    id: '6',
    title: 'Tutorial Video',
    description: 'Learn design fundamentals in 10 minutes',
    type: 'video',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop',
    uploadDate: new Date().toISOString(),
    clicks: 678,
    isActive: true,
  },
];
