import { client } from '@/lib/sanity.client'
import { BlogPost, BlogCategory } from '@/types/schema'
import FeaturedPost from '@/components/sections/blog/FeaturedPost'
import BlogPosts from '@/components/sections/blog/BlogPosts'
import Categories from '@/components/sections/blog/Categories'

export const revalidate = 60

async function getFeaturedPost() {
  return client.fetch<BlogPost>(`
    *[_type == "blogPost" && isFeatured == true][0] {
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
      readTime
    }
  `)
}

async function getBlogPosts() {
  return client.fetch<BlogPost[]>(`
    *[_type == "blogPost"] | order(publishedAt desc) {
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
      readTime
    }
  `)
}

async function getCategories() {
  const categories = await client.fetch<BlogCategory[]>(`
    *[_type == "blogCategory"] | order(order asc) {
      _type,
      name,
      slug,
      order,
      "count": count(*[_type == "blogPost" && references(^._id)])
    }
  `)

  // Add "All Posts" category at the beginning
  const allPostsCount = await client.fetch<number>('count(*[_type == "blogPost"])')
  return [
    {
      _type: 'blogCategory' as const,
      name: 'Все статьи',
      slug: { current: 'all' },
      order: -1,
      count: allPostsCount
    },
    ...categories
  ]
}

export default async function BlogPage() {
  const [featuredPost, posts, categories] = await Promise.all([
    getFeaturedPost(),
    getBlogPosts(),
    getCategories()
  ])

  console.log('Featured Post:', featuredPost)
  console.log('Posts:', posts)
  console.log('Categories:', categories)

  return (
    <main className="min-h-screen bg-black pt-20">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Блог
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Новости, советы и интересные истории из мира огненных шоу
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {featuredPost && <FeaturedPost post={featuredPost} />}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <BlogPosts posts={posts} />
            </div>
            <div>
              <Categories categories={categories} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
