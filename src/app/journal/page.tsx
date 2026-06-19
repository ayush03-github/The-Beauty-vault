import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./journal.module.css";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const POSTS: Post[] = [
  {
    id: "1",
    title: "How to Protect Your Skin Barrier During Seasonal Changes",
    excerpt: "As temperatures drop and humidity levels change, your skin's outer barrier faces increased stress. Learn the critical steps to protect it using ceramide complexes and humectants.",
    date: "June 12, 2026",
    readTime: "5 min read",
    image: "/blog_image.png",
    category: "Skin Education",
  },
  {
    id: "2",
    title: "Understanding AHAs, BHAs, and PHAs: An Exfoliation Guide",
    excerpt: "Chemical exfoliation can transform skin texture, but choosing the wrong acid can trigger irritation. We break down the differences between Alpha, Beta, and Poly hydroxy acids.",
    date: "May 28, 2026",
    readTime: "7 min read",
    image: "/products/toner.png",
    category: "Science",
  },
  {
    id: "3",
    title: "The Botanical Biotech Synergy: Nature Refined by Science",
    excerpt: "Explore how green biotechnology molecularly refines raw plant extracts to boost active stability, increase skin absorption, and deliver clinical skin results.",
    date: "May 15, 2026",
    readTime: "4 min read",
    image: "/lab_image.png",
    category: "Philosophy",
  },
  {
    id: "4",
    title: "Vitamin C vs. Hyperpigmentation: How Actives Fade Dark Spots",
    excerpt: " Hyperpigmentation is a complex skin response. Discover how stabilized Vitamin C and ferulic acid work at a cellular level to brighten tone and regulate melanin production.",
    date: "April 30, 2026",
    readTime: "6 min read",
    image: "/products/serum.png",
    category: "Skin Education",
  }
];

export default function JournalPage() {
  const featuredPost = POSTS[0];
  const gridPosts = POSTS.slice(1);

  return (
    <div className={styles.journalPage}>
      <div className="container">
        
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.subtitle}>The Beauty Vault Journal</span>
          <h1 className={`font-serif ${styles.title}`}>Stories & Skin Science</h1>
        </header>

        {/* Featured Post */}
        {featuredPost && (
          <article className={styles.featuredPost}>
            <div className={styles.featuredImageWrapper}>
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                width={700}
                height={394}
                className={styles.image}
                priority
              />
            </div>
            
            <div className={styles.featuredContent}>
              <div className={styles.meta}>
                <span>{featuredPost.category}</span>
                <span> • </span>
                <span>{featuredPost.date}</span>
                <span> • </span>
                <span>{featuredPost.readTime}</span>
              </div>
              <h2 className={styles.postTitle}>{featuredPost.title}</h2>
              <p className={styles.excerpt}>{featuredPost.excerpt}</p>
              <Link href={`/journal/${featuredPost.id}`} className={styles.readMore}>
                Read Article
              </Link>
            </div>
          </article>
        )}

        {/* Regular Posts Grid */}
        <div className={styles.grid}>
          {gridPosts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className={styles.image}
                />
              </div>
              
              <div className={styles.meta} style={{ marginTop: "10px" }}>
                <span>{post.category}</span>
                <span> • </span>
                <span>{post.date}</span>
              </div>
              
              <h3 className={styles.cardTitle}>{post.title}</h3>
              <p className={styles.excerpt} style={{ fontSize: "0.85rem", marginTop: "2px" }}>
                {post.excerpt.slice(0, 100)}...
              </p>
              
              <Link href={`/journal/${post.id}`} className={styles.readMore} style={{ fontSize: "0.8rem", marginTop: "5px" }}>
                Read Article
              </Link>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
