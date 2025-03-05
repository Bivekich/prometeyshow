import { client } from '@/lib/sanity.client'
import { VideoBanner, CompanyIntro, HomeStats, UpcomingEvent, MainPageService, MainPageSections } from '@/types/schema'
import VideoBannerSection from '@/components/sections/VideoBanner'
import CompanyIntroSection from '@/components/sections/CompanyIntro'
import ServicesSection from '@/components/sections/Services'
import StatisticsSection from '@/components/sections/Statistics'
import UpcomingEventsSection from '@/components/sections/UpcomingEvents'
import ContactForm from '@/components/sections/ContactForm'

export const revalidate = 60

async function getVideoBanner() {
  return client.fetch<VideoBanner>(`
    *[_type == "videoBanner"][0] {
      _type,
      title,
      subtitle,
      "videoUrl": {
        "asset": {
          "url": videoUrl.asset->url
        }
      }
    }
  `)
}

async function getCompanyIntro() {
  return client.fetch<CompanyIntro>(`
    *[_type == "companyIntro"][0] {
      _type,
      title,
      description,
      features
    }
  `)
}

async function getHomeStats() {
  return client.fetch<HomeStats>(`
    *[_type == "homeStats"][0] {
      _type,
      stats
    }
  `)
}

async function getMainPageSections() {
  return client.fetch<MainPageSections>(`
    *[_type == "mainPageSections"][0] {
      _type,
      servicesSection,
      eventsSection
    }
  `)
}

async function getUpcomingEvents() {
  return client.fetch<UpcomingEvent[]>(`
    *[_type == "upcomingEvent"] | order(order asc) {
      _type,
      title,
      date,
      time,
      location,
      description,
      type,
      typeLabel,
      order
    }
  `)
}

async function getMainPageServices() {
  return client.fetch<MainPageService[]>(`
    *[_type == "mainPageService"] | order(order asc) {
      _type,
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

export default async function Home() {
  const [videoBanner, companyIntro, homeStats, sections, upcomingEvents, services] = await Promise.all([
    getVideoBanner(),
    getCompanyIntro(),
    getHomeStats(),
    getMainPageSections(),
    getUpcomingEvents(),
    getMainPageServices(),
  ])

  return (
    <main className="min-h-screen">
      <VideoBannerSection data={videoBanner} />
      <CompanyIntroSection data={companyIntro} />
      <ServicesSection services={services} sectionData={sections.servicesSection} />
      <StatisticsSection data={homeStats} />
      <UpcomingEventsSection events={upcomingEvents} sectionData={sections.eventsSection} />
      <ContactForm />
    </main>
  )
}
