import type { BlogPost, User, Comment } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff&bold=true",
    bio: "Full-stack developer and tech writer. I write about React, TypeScript, and building great products.",
    role: "user",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Michael+Chen&background=10b981&color=fff&bold=true",
    bio: "UX designer and creative thinker. Passionate about design systems and accessible interfaces.",
    role: "user",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Emily+Davis&background=f59e0b&color=fff&bold=true",
    bio: "Data scientist and AI enthusiast. Turning complex ideas into clear, actionable insights.",
    role: "user",
  },
  {
    id: "4",
    name: "Raj Patel",
    email: "raj@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Raj+Patel&background=8b5cf6&color=fff&bold=true",
    bio: "Backend engineer obsessed with performance, distributed systems, and clean architecture.",
    role: "user",
  },
  {
    id: "5",
    name: "Admin User",
    email: "admin@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff&bold=true",
    bio: "Platform administrator",
    role: "admin",
  },
];

export const mockComments: Comment[] = [
  {
    id: "1",
    content:
      "This is exactly what I needed. The section on memoization cleared up a lot of confusion for me — great breakdown!",
    author: mockUsers[1],
    createdAt: new Date("2024-01-15T10:30:00"),
    postId: "1",
  },
  {
    id: "2",
    content:
      "I've been using this approach for a while and it works wonders. Especially the part about server state — React Query is a game-changer.",
    author: mockUsers[2],
    createdAt: new Date("2024-01-15T14:20:00"),
    postId: "1",
  },
  {
    id: "3",
    content:
      "Would love to see a follow-up article on advanced techniques like concurrent rendering and Suspense boundaries.",
    author: mockUsers[0],
    createdAt: new Date("2024-01-16T09:15:00"),
    postId: "2",
  },
  {
    id: "4",
    content:
      "The template literal types example was mind-blowing. Never thought about using them that way for event names!",
    author: mockUsers[3],
    createdAt: new Date("2024-01-12T08:45:00"),
    postId: "3",
  },
  {
    id: "5",
    content:
      "Container queries are finally here and I'm so happy about it. This article explains them better than the MDN docs honestly.",
    author: mockUsers[0],
    createdAt: new Date("2024-01-07T11:20:00"),
    postId: "4",
  },
  {
    id: "6",
    content:
      "Great primer on Web3. One thing I'd add: the tooling around Hardhat and Foundry has gotten really solid lately for smart contract testing.",
    author: mockUsers[1],
    createdAt: new Date("2024-01-04T16:00:00"),
    postId: "5",
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
      "Explore how artificial intelligence is transforming web development, from code generation to user experience, and what it means for the future of the craft.",
    author: mockUsers[2],
    publishedAt: new Date("2024-01-08T14:30:00"),
    updatedAt: new Date("2024-01-08T14:30:00"),
    status: "published",
    likes: 312,
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
      "Deep dive into advanced TypeScript patterns including conditional types, template literals, and utility types that will sharpen your type-fu.",
    author: mockUsers[1],
    publishedAt: new Date("2024-01-05T09:00:00"),
    updatedAt: new Date("2024-01-05T09:00:00"),
    status: "published",
    likes: 198,
    comments: [mockComments[3]],
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
      "Master modern CSS — from container queries to the new color spaces — and learn how to build truly responsive, component-aware layouts.",
    author: mockUsers[0],
    publishedAt: new Date("2024-01-03T16:00:00"),
    updatedAt: new Date("2024-01-03T16:00:00"),
    status: "published",
    likes: 143,
    comments: [mockComments[4]],
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
      "A practical introduction to Web3 and blockchain development — covering smart contracts, dApps, and how to get your first project deployed on-chain.",
    author: mockUsers[2],
    publishedAt: new Date("2024-01-01T11:00:00"),
    updatedAt: new Date("2024-01-01T11:00:00"),
    status: "published",
    likes: 167,
    comments: [mockComments[5]],
    tags: ["Web3", "Blockchain", "Cryptocurrency"],
    coverImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Designing for Performance: The Hidden UX of Speed",
    content: `# Designing for Performance

Speed is a feature. The way users perceive performance is as much a design problem as an engineering one.

## Perceived vs. Actual Performance

Users don't experience milliseconds — they experience wait. Perceived performance is about managing that experience:

- Skeleton screens vs. spinners
- Optimistic UI updates
- Progressive loading strategies

## Techniques That Matter

- **Core Web Vitals**: LCP, CLS, INP explained
- **Font loading**: How FOUT and FOIT affect UX
- **Image optimization**: Modern formats and lazy loading

## Designing Loading States

Loading states are part of your brand. Poor loading states erode trust.`,
    excerpt:
      "Speed is a UX problem as much as an engineering one. Learn how to design loading states, optimize perceived performance, and build trust through snappy interfaces.",
    author: mockUsers[1],
    publishedAt: new Date("2023-12-28T13:00:00"),
    updatedAt: new Date("2023-12-28T13:00:00"),
    status: "published",
    likes: 211,
    comments: [],
    tags: ["Design", "Frontend", "Performance"],
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Node.js at Scale: Lessons from Production",
    content: `# Node.js at Scale

Running Node.js in production at scale teaches you things no tutorial covers. Here are lessons learned the hard way.

## Event Loop Health

The event loop is everything in Node.js. Blocking it — even briefly — cascades into latency spikes:

- Use worker threads for CPU-intensive tasks
- Monitor event loop lag in production
- Profile with clinic.js

## Memory Management

Memory leaks in Node.js are subtle:

- Understand V8 garbage collection
- Watch for closure leaks
- Stream large payloads instead of buffering

## Clustering and Load Balancing

- Use the cluster module or PM2
- Leverage horizontal scaling
- Implement graceful shutdowns`,
    excerpt:
      "Real-world lessons from running Node.js at scale — from event loop pitfalls to graceful shutdowns and memory leak hunting.",
    author: mockUsers[3],
    publishedAt: new Date("2023-12-22T10:30:00"),
    updatedAt: new Date("2023-12-22T10:30:00"),
    status: "published",
    likes: 289,
    comments: [],
    tags: ["JavaScript", "Web Development", "Programming"],
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
  },
];

export const trendingPosts = [...mockPosts]
  .sort((a, b) => b.likes - a.likes)
  .slice(0, 3);

export const featuredPosts = mockPosts.slice(0, 4);

export const getPostsByTag = (tag: string) =>
  mockPosts.filter(p => p.tags.includes(tag));

export const getPostsByAuthor = (authorId: string) =>
  mockPosts.filter(p => p.author.id === authorId);

export const allTags = [...new Set(mockPosts.flatMap(p => p.tags))];