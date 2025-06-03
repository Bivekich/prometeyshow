import { cachedClient } from '@/lib/sanity';
import {
  VideoBanner,
  CompanyIntro,
  HomeStats,
  MainPageService,
  MainPageSections,
} from '@/types/schema';
import VideoBannerSection from '@/components/sections/VideoBanner';
import CompanyIntroSection from '@/components/sections/CompanyIntro';
import ServicesSection from '@/components/sections/Services';
import StatisticsSection from '@/components/sections/Statistics';
import ContactForm from '@/components/sections/ContactForm';

export const revalidate = 60;

async function getVideoBanner() {
  return cachedClient.fetch<VideoBanner>(`
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
  `);
}

async function getCompanyIntro() {
  return cachedClient.fetch<CompanyIntro>(`
    *[_type == "companyIntro"][0] {
      _type,
      title,
      description,
      features
    }
  `);
}

async function getHomeStats() {
  return cachedClient.fetch<HomeStats>(`
    *[_type == "homeStats"][0] {
      _type,
      stats
    }
  `);
}

async function getMainPageSections() {
  return cachedClient.fetch<MainPageSections>(`
    *[_type == "mainPageSections"][0] {
      _type,
      servicesSection,
      eventsSection
    }
  `);
}

async function getMainPageServices() {
  return cachedClient.fetch<MainPageService[]>(`
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
  `);
}

export default async function Home() {
  const [videoBanner, companyIntro, homeStats, sections, services] =
    await Promise.all([
      getVideoBanner(),
      getCompanyIntro(),
      getHomeStats(),
      getMainPageSections(),
      getMainPageServices(),
    ]);

  return (
    <main className="min-h-screen">
      <VideoBannerSection data={videoBanner} />
      <CompanyIntroSection data={companyIntro} />
      <ServicesSection
        services={services}
        sectionData={sections.servicesSection}
      />
      <StatisticsSection data={homeStats} />
      <ContactForm />
    </main>
  );
}
