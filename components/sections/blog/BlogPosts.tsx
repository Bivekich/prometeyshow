'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import StaticImage from '@/components/ui/StaticImage';
import { BlogPost } from '@/types/schema';
import { formatDate } from '@/lib/utils';
import { urlFor } from '@/lib/sanity';

interface BlogPostsProps {
  posts: BlogPost[]
}

const BlogPosts = ({ posts }: BlogPostsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <motion.div
          key={post._id}
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-800 hover:border-red-500/50 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative aspect-[16/9] md:aspect-square rounded-t-lg md:rounded-l-lg md:rounded-t-none overflow-hidden">
                <StaticImage
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  {post.category.name}
                </div>
              </div>
              <div className="md:col-span-2 p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  <Link href={`/blog/${post.slug.current}`} className="hover:text-gray-300">  
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-400 mb-6">{post.excerpt}</p>
                <Link href={`/blog/${post.slug.current}`}>
                  <Button
                    variant="outline"
                    className="group border-red-500/20 text-gray-900 hover:text-white hover:border-red-500 hover:bg-red-500"
                  >
                    Читать далее
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogPosts;
