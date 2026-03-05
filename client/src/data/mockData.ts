import type { BlogPost, User, Comment } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff",
    bio: "Full-stack developer and tech writer",
    role: "user",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Michael+Chen&background=10b981&color=fff",
    bio: "UX designer and creative thinker",
    role: "user",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Emily+Davis&background=f59e0b&color=fff",
    bio: "Data scientist and AI enthusiast",
    role: "user",
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff",
    bio: "Platform administrator",
    role: "admin",
  },
];

export const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "Great article! This really helped me understand the concept better.",
    author: mockUsers[1],
    createdAt: new Date("2024-01-15T10:30:00"),
    postId: "1",
  },
  {
    id: "2",
    content:
      "I have been using this approach for a while and it works wonders. Thanks for sharing!",
    author: mockUsers[2],
    createdAt: new Date("2024-01-15T14:20:00"),
    postId: "1",
  },
  {
    id: "3",
    content: "Would love to see a follow-up article on advanced techniques.",
    author: mockUsers[0],
    createdAt: new Date("2024-01-16T09:15:00"),
    postId: "2",
  },
];

export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications: Best Practices and Patterns",
    content: `# Building Scalable React Applications

In this comprehensive guide, we'll explore the best practices and patterns for building scalable React applications that can grow with your needs.

## Understanding Scalability

Scalability in web applications refers to the ability to handle increased load without compromising performance. For React applications, this involves several key aspects:

### 1. Component Architecture

A well-structured component architecture is the foundation of scalable React applications:

- **Single Responsibility Principle**: Each component should have one clear purpose
- **Composition over Inheritance**: Favor composition patterns
- **Prop Drilling Management**: Use context or state management solutions

\`\`\`jsx
// Good example - Single responsibility
const UserAvatar = ({ user, size }) => (
  <img 
    src={user.avatar} 
    alt={user.name}
    className={\`avatar avatar-\${size}\`}
  />
);

// Bad example - Multiple responsibilities
const UserProfile = ({ user, onUpdate, onDelete, onShare }) => (
  <div>
    <img src={user.avatar} alt={user.name} />
    <button onClick={() => onUpdate(user)}>Edit</button>
    <button onClick={() => onDelete(user.id)}>Delete</button>
    <button onClick={() => onShare(user.id)}>Share</button>
  </div>
);
\`\`\`

### 2. State Management

Effective state management is crucial for scalability:

- **Local State**: Use useState for component-specific state
- **Global State**: Consider Redux, Zustand, or Context API
- **Server State**: Use React Query or SWR for server state

### 3. Performance Optimization

Key performance techniques:

- **Code Splitting**: Lazy load components and routes
- **Memoization**: Use React.memo, useMemo, and useCallback
- **Virtual Scrolling**: For large lists and tables

## Conclusion

Building scalable React applications requires careful planning and adherence to best practices. By focusing on component architecture, state management, and performance optimization, you can create applications that grow seamlessly with your user base.`,
    excerpt:
      "Learn the essential patterns and best practices for building React applications that can scale with your growing user base and business requirements.",
    author: mockUsers[0],
    publishedAt: new Date("2024-01-10T10:00:00"),
    updatedAt: new Date("2024-01-10T10:00:00"),
    status: "published",
    likes: 245,
    comments: [mockComments[0], mockComments[1]],
    tags: ["React", "JavaScript", "Web Development"],
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "The Future of AI in Web Development: Opportunities and Challenges",
    content: `# The Future of AI in Web Development

Artificial Intelligence is revolutionizing how we build and interact with web applications. Let's explore the opportunities and challenges ahead.

## Current State of AI in Web Development

AI is already making significant impacts:

- **Code Generation**: GitHub Copilot, ChatGPT, and other AI assistants
- **Automated Testing**: AI-powered test generation and execution
- **User Experience**: Personalization and intelligent interfaces

## Emerging Opportunities

### 1. Intelligent Code Assistance

AI tools are becoming sophisticated partners in development:

- Real-time code suggestions
- Bug detection and fixing
- Automated refactoring

### 2. Enhanced User Experiences

AI enables more personalized and intuitive interfaces:

- Adaptive UI based on user behavior
- Natural language interactions
- Predictive user flows

## Challenges and Considerations

While the opportunities are exciting, we must address:

- **Privacy and Security**: Protecting user data
- **Bias and Fairness**: Ensuring equitable AI systems
- **Skill Evolution**: Adapting development practices

## Looking Ahead

The future of web development will be a collaboration between human creativity and AI capabilities.`,
    excerpt:
      "Explore how artificial intelligence is transforming web development, from code generation to user experience, and what it means for developers.",
    author: mockUsers[2],
    publishedAt: new Date("2024-01-08T14:30:00"),
    updatedAt: new Date("2024-01-08T14:30:00"),
    status: "published",
    likes: 189,
    comments: [mockComments[2]],
    tags: ["AI", "Machine Learning", "Future Tech"],
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Mastering TypeScript: Advanced Patterns and Techniques",
    content: `# Mastering TypeScript

TypeScript has become essential for modern JavaScript development. Let's dive into advanced patterns and techniques.

## Advanced Type Patterns

### 1. Conditional Types

Conditional types allow you to create type logic:

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
\`\`\`

### 2. Template Literal Types

Create powerful string-based type systems:

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ButtonEvents = EventName<'click' | 'hover'>; // 'onClick' | 'onHover'
\`\`\`

## Best Practices

- Use strict mode
- Leverage type inference
- Create reusable type utilities
- Document complex types

## Conclusion

Mastering TypeScript opens up new possibilities for type-safe, maintainable code.`,
    excerpt:
      "Deep dive into advanced TypeScript patterns and techniques that will level up your development skills and code quality.",
    author: mockUsers[1],
    publishedAt: new Date("2024-01-05T09:00:00"),
    updatedAt: new Date("2024-01-05T09:00:00"),
    status: "published",
    likes: 156,
    comments: [],
    tags: ["TypeScript", "JavaScript", "Programming"],
    coverImage:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Modern CSS Techniques for Responsive Design",
    content: `# Modern CSS Techniques

CSS has evolved significantly. Here are modern techniques for responsive design.

## CSS Grid and Flexbox

Modern layout systems:

- CSS Grid for two-dimensional layouts
- Flexbox for one-dimensional layouts
- Container queries for component-based responsiveness

## Advanced Techniques

- CSS Custom Properties
- Clamp() for fluid typography
- Modern color functions

## Best Practices

- Mobile-first approach
- Performance optimization
- Accessibility considerations`,
    excerpt:
      "Explore modern CSS techniques including Grid, Flexbox, and new features that make responsive design easier and more powerful.",
    author: mockUsers[0],
    publishedAt: new Date("2024-01-03T16:00:00"),
    updatedAt: new Date("2024-01-03T16:00:00"),
    status: "published",
    likes: 98,
    comments: [],
    tags: ["CSS", "Design", "Frontend"],
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Introduction to Web3 and Blockchain Development",
    content: `# Web3 and Blockchain

Web3 represents the next evolution of the internet. Let's explore the fundamentals.

## What is Web3?

Web3 is a decentralized internet built on blockchain technology.

## Key Concepts

- Smart contracts
- Decentralized applications (dApps)
- Cryptocurrency and tokens
- Decentralized finance (DeFi)

## Getting Started

- Learn blockchain basics
- Understand smart contracts
- Explore development tools
- Build your first dApp

## Challenges

- Scalability issues
- User experience
- Regulatory concerns
- Technical complexity`,
    excerpt:
      "An introduction to Web3 and blockchain development, covering key concepts, tools, and how to get started building decentralized applications.",
    author: mockUsers[2],
    publishedAt: new Date("2024-01-01T11:00:00"),
    updatedAt: new Date("2024-01-01T11:00:00"),
    status: "published",
    likes: 134,
    comments: [],
    tags: ["Web3", "Blockchain", "Cryptocurrency"],
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
  },
];

export const trendingPosts = mockPosts.slice(0, 3);
export const featuredPosts = mockPosts.slice(1, 4);
