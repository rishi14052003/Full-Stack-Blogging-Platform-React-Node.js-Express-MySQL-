import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Clock, Bookmark, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "../types";
import { formatDistanceToNow } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}

const tagColors: Record<string, { bg: string; text: string; dot: string }> = {
  React: { bg: "#EFF6FF", text: "#1D4ED8", dot: "#3B82F6" },
  JavaScript: { bg: "#FEFCE8", text: "#A16207", dot: "#EAB308" },
  TypeScript: { bg: "#F0FDF4", text: "#15803D", dot: "#22C55E" },
  AI: { bg: "#FDF4FF", text: "#7E22CE", dot: "#A855F7" },
  CSS: { bg: "#FFF7ED", text: "#C2410C", dot: "#F97316" },
  Design: { bg: "#FFF1F2", text: "#BE123C", dot: "#F43F5E" },
  Web3: { bg: "#F0FDFA", text: "#0F766E", dot: "#14B8A6" },
  default: { bg: "#F8FAFC", text: "#475569", dot: "#94A3B8" },
};

const getTagStyle = (tag: string) =>
  tagColors[tag] || tagColors.default;

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = "default" }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [saved, setSaved] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setSaved(!saved);
  };

  /* ── COMPACT ────────────────────────────────────────────── */
  if (variant === "compact") {
    return (
      <Link to={`/post/${post.id}`} className="block group">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            padding: "14px 16px",
            borderRadius: "12px",
            background: "#fff",
            border: "1px solid #F1F5F9",
            transition: "all 0.2s ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 4px 16px rgba(0,0,0,0.08)";
            (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E8F0";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 1px 3px rgba(0,0,0,0.04)";
            (e.currentTarget as HTMLDivElement).style.borderColor = "#F1F5F9";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          }}
        >
          {/* Colored left accent bar */}
          <div
            style={{
              width: "3px",
              borderRadius: "4px",
              background: `linear-gradient(180deg, ${getTagStyle(post.tags[0]).dot}, transparent)`,
              alignSelf: "stretch",
              flexShrink: 0,
            }}
          />
          <img
            src={
              post.author.avatar ||
              `https://ui-avatars.com/api/?username=${post.author.username}&background=3b82f6&color=fff`
            }
            alt={post.author.username}
            style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, objectFit: "cover" }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#0F172A",
                lineHeight: "1.4",
                marginBottom: "4px",
                fontFamily: "'Georgia', serif",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.title}
            </h3>
            <p style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "6px" }}>
              {post.author.username} · {timeAgo}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {post.tags.slice(0, 1).map(tag => {
                const s = getTagStyle(tag);
                return (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      padding: "2px 7px",
                      borderRadius: "99px",
                      background: s.bg,
                      color: s.text,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
              <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#94A3B8" }}>
                <Heart size={11} />
                {likeCount}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#94A3B8" }}>
                <MessageCircle size={11} />
                {post.comments.length}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  /* ── FEATURED ───────────────────────────────────────────── */
  if (variant === "featured") {
    return (
      <Link to={`/post/${post.id}`} className="block group">
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid #F1F5F9",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            position: "relative",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 12px 40px rgba(0,0,0,0.12)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 2px 12px rgba(0,0,0,0.06)";
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          }}
        >
          {/* Cover image */}
          {post.featured_image && (
            <div style={{ height: "100px", overflow: "hidden" }}>
              <img
                src={post.featured_image}
                alt={post.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)")}
                onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)",
                }}
              />
              {/* Tags on image */}
              <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px" }}>
                {post.tags.slice(0, 2).map(tag => {
                  const s = getTagStyle(tag);
                  return (
                    <span
                      key={tag}
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.92)",
                        color: s.text,
                        backdropFilter: "blur(4px)",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              {/* Save button */}
              <button
                onClick={handleSave}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: saved ? "#0F172A" : "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                  backdropFilter: "blur(4px)",
                }}
              >
                <Bookmark
                  size={14}
                  fill={saved ? "#fff" : "none"}
                  color={saved ? "#fff" : "#0F172A"}
                />
              </button>
            </div>
          )}

          <div style={{ padding: "10px 12px 8px" }}>
            {/* Author row */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <img
                src={post.author.avatar}
                alt={post.author.username}
                style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid #F1F5F9" }}
              />
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#0F172A", lineHeight: 1.2 }}>
                  {post.author.username}
                </p>
                <p style={{ fontSize: "11px", color: "#94A3B8" }}>{timeAgo}</p>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <ArrowUpRight
                  size={16}
                  style={{
                    color: "#CBD5E1",
                    transition: "color 0.2s, transform 0.2s",
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#0F172A",
                lineHeight: "1.35",
                marginBottom: "4px",
                fontFamily: "'Georgia', serif",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.title}
            </h2>

            {/* Excerpt */}
            <p
              style={{
                fontSize: "10px",
                color: "#64748B",
                lineHeight: "1.6",
                marginBottom: "8px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.excerpt}
            </p>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "12px",
                borderTop: "1px solid #F8FAFC",
              }}
            >
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleLike}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    color: liked ? "#EF4444" : "#94A3B8",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s",
                    fontWeight: liked ? 600 : 400,
                  }}
                >
                  <Heart size={14} fill={liked ? "#EF4444" : "none"} />
                  {likeCount}
                </button>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    color: "#94A3B8",
                  }}
                >
                  <MessageCircle size={14} />
                  {post.comments.length}
                </span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  color: "#CBD5E1",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Clock size={11} />
                {Math.ceil(post.content.split(" ").length / 200)} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  /* ── DEFAULT ────────────────────────────────────────────── */
  return (
    <Link to={`/post/${post.id}`} className="block group">
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #F1F5F9",
          transition: "all 0.25s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 8px 24px rgba(0,0,0,0.09)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E8F0";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 1px 4px rgba(0,0,0,0.05)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLDivElement).style.borderColor = "#F1F5F9";
        }}
      >
        {/* Top color strip based on first tag */}
        <div
          style={{
            height: "3px",
            background: `linear-gradient(90deg, ${getTagStyle(post.tags[0]).dot}, ${getTagStyle(post.tags[1] || post.tags[0]).dot})`,
          }}
        />

        <div style={{ padding: "8px 10px 6px" }}>
          {/* Author + time */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <img
              src={post.author.avatar}
              alt={post.author.username}
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #F1F5F9",
              }}
            />
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#334155", lineHeight: 1.2 }}>
                {post.author.username}
              </p>
              <p style={{ fontSize: "11px", color: "#94A3B8", display: "flex", alignItems: "center", gap: "3px" }}>
                <Clock size={10} /> {timeAgo}
              </p>
            </div>
            {/* Save button top-right */}
            <button
              onClick={handleSave}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: saved ? "#0F172A" : "#CBD5E1",
                transition: "color 0.2s",
                display: "flex",
              }}
            >
              <Bookmark size={12} fill={saved ? "#0F172A" : "none"} />
            </button>
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: "1.4",
              marginBottom: "3px",
              fontFamily: "'Georgia', serif",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            style={{
              fontSize: "10px",
              color: "#64748B",
              lineHeight: "1.55",
              marginBottom: "6px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: "3px", marginBottom: "6px", flexWrap: "wrap" }}>
            {post.tags.map(tag => {
              const s = getTagStyle(tag);
              return (
                <span
                  key={tag}
                  style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "1px 4px",
                    borderRadius: "99px",
                    background: s.bg,
                    color: s.text,
                    letterSpacing: "0.03em",
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "10px",
              borderTop: "1px solid #F8FAFC",
            }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleLike}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  color: liked ? "#EF4444" : "#94A3B8",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "color 0.2s",
                  fontWeight: liked ? 600 : 400,
                }}
              >
                <Heart size={13} fill={liked ? "#EF4444" : "none"} />
                {likeCount}
              </button>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  color: "#94A3B8",
                }}
              >
                <MessageCircle size={13} />
                {post.comments.length}
              </span>
            </div>
            <span style={{ fontSize: "11px", color: "#CBD5E1" }}>
              {Math.ceil(post.content.split(" ").length / 200)} min read
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;