'use client';

import { motion } from 'framer-motion';
import BlogPosts from '@/components/sections/blog/BlogPosts';
import Categories from '@/components/sections/blog/Categories';
import FeaturedPost from '@/components/sections/blog/FeaturedPost';

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Заголовок страницы */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Блог
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Новости, советы и интересные истории из мира огненных шоу
            </p>
          </motion.div>
        </div>
      </section>

      {/* Основные секции */}
      <FeaturedPost />
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <BlogPosts />
          </div>
          <div className="lg:col-span-1">
            <Categories />
          </div>
        </div>
      </div>
    </main>
  );
}
