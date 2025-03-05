import { client } from '@/lib/sanity.client'
import { Achievement, AboutStats, AboutGalleryImage, TeamMember, Review, HistoryEvent, PageHeaders } from '@/types/schema'
import History from '@/components/sections/about/History'
import Team from '@/components/sections/about/Team'
import Achievements from '@/components/sections/about/Achievements'
import Reviews from '@/components/sections/about/Reviews'
import Gallery from '@/components/sections/about/Gallery'
import PageHeaderComponent from '@/components/sections/about/PageHeader'

export const revalidate = 60

async function getAchievements() {
  return client.fetch<Achievement[]>(`
    *[_type == "achievement"] | order(order asc) {
      _type,
      title,
      year,
      description,
      icon,
      order
    }
  `)
}

async function getAboutStats() {
  return client.fetch<AboutStats>(`
    *[_type == "aboutStats"][0] {
      _type,
      clientCount,
      citiesCount,
      yearsExperience
    }
  `)
}

async function getAboutGallery() {
  return client.fetch<AboutGalleryImage[]>(`
    *[_type == "aboutGallery"] | order(order asc) {
      _type,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      },
      alt,
      order
    }
  `)
}

async function getTeamMembers() {
  return client.fetch<TeamMember[]>(`
    *[_type == "teamMember"] | order(order asc) {
      _type,
      name,
      role,
      description,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      },
      socialMedia,
      order
    }
  `)
}

async function getReviews() {
  return client.fetch<Review[]>(`
    *[_type == "review"] | order(order asc) {
      _type,
      author,
      role,
      content,
      rating,
      date,
      "avatar": {
        "asset": {
          "url": avatar.asset->url
        }
      },
      order
    }
  `)
}

async function getHistoryEvents() {
  return client.fetch<HistoryEvent[]>(`
    *[_type == "historyEvent"] | order(order asc) {
      _type,
      year,
      title,
      description,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      },
      order
    }
  `)
}

async function getPageHeader() {
  return client.fetch<PageHeaders>(`
    *[_type == "pageHeaders"][0] {
      aboutHeader
    }
  `)
}

export default async function AboutPage() {
  const [achievements, stats, images, members, reviews, events, header] = await Promise.all([
    getAchievements(),
    getAboutStats(),
    getAboutGallery(),
    getTeamMembers(),
    getReviews(),
    getHistoryEvents(),
    getPageHeader(),
  ])

  return (
    <main className="min-h-screen bg-black pt-20">
      <PageHeaderComponent data={header.aboutHeader} />
      <Achievements achievements={achievements} stats={stats} />
      <Gallery images={images} />
      <Team members={members} />
      <Reviews reviews={reviews} />
      <History events={events} />
    </main>
  );
}
