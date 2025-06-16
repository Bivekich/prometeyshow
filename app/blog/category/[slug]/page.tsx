import { cachedClient } from '@/lib/sanity'
import { BlogPost, BlogCategory } from '@/types/schema'
import BlogPosts from '@/components/sections/blog/BlogPosts'
import Categories from '@/components/sections/blog/Categories'

export const revalidate = 60

interface Props {
  params: {
    slug: string
  }
}

async function getBlogPostsByCategory(slug: string) {
  if (slug === 'all') {
    return cachedClient.fetch<BlogPost[]>(`
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

  return cachedClient.fetch<BlogPost[]>(`
    *[_type == "blogPost" && category->slug.current == $slug] | order(publishedAt desc) {
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
  `, { slug })
}

async function getCategories() {
  const categories = await cachedClient.fetch<BlogCategory[]>(`
    *[_type == "blogCategory"] | order(order asc) {
      _type,
      name,
      slug,
      order,
      "count": count(*[_type == "blogPost" && references(^._id)])
    }
  `)

  // Add "All Posts" category at the beginning
  const allPostsCount = await cachedClient.fetch<number>('count(*[_type == "blogPost"])')
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

export default async function CategoryPage({ params }: Props) {
  const [posts, categories] = await Promise.all([
    getBlogPostsByCategory(params.slug),
    getCategories()
  ])

  return (
    <main className="min-h-screen bg-black pt-20">
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