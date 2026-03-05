export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  is_admin: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  created_at: Date;
  updated_at: Date;
  status: 'draft' | 'published' | 'archived';
  featured_image?: string;
  likes?: number;
  comments?: Comment[];
  tags?: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  created_at: Date;
  post_id: string;
  parent_id?: string;
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
