import { client } from '@/lib/sanity'
import { BlogPost } from '@/types/schema'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

interface Props {
  params: {
    slug: string
  }
}

async function getBlogPost(slug: string) {
  return client.fetch<BlogPost>(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage {
        asset-> {
          url,
          _ref
        }
      },
      "category": category->{
        _type,
        name,
        slug
      },
      publishedAt,
      readTime,
      content
    }
  `, { slug })
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-white">Статья не найдена</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <Image
          src={post.mainImage.asset.url}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 z-20 w-full p-8">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <div className="mb-4">
                <span className="rounded-full bg-red-600 px-4 py-2 text-sm text-white">
                  {post.category.name}
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center gap-6 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime} мин чтения
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="prose prose-lg prose-invert mx-auto max-w-3xl text-white">
          <PortableText value={post.content} />
        </div>
      </div>
    </main>
  )
}
