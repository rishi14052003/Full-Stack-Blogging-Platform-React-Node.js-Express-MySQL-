export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'admin';
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'scheduled';
  scheduledAt?: Date;
  likes: number;
  comments: Comment[];
  tags: string[];
  coverImage?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  postId: string;
  parentId?: string;
  replies?: Comment[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ThemeState {
  isDark: boolean;
}
