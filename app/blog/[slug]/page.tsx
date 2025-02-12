'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { blogPosts, featuredPost } from '@/data/blog';
import ReactMarkdown from 'react-markdown';
import { use } from 'react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = use(Promise.resolve(params));

  const post =
    slug === featuredPost.slug
      ? featuredPost
      : blogPosts.find((post) => post.slug === slug);

  useEffect(() => {
    if (!post) {
      router.push('/blog');
    }
  }, [post, router]);

  if (!post) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Заголовок статьи */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-gray-400">{post.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Изображение статьи */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative h-[400px] md:h-[600px]"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Содержимое статьи */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto prose prose-invert prose-lg"
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
