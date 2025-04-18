import { client } from '@/lib/sanity';
import {
  Achievement,
  AboutStats,
  AboutGalleryImage,
  PageHeaders,
  DocumentFile,
} from '@/types/schema';
import Achievements from '@/components/sections/about/Achievements';
import Reviews from '@/components/sections/about/Reviews';
import Gallery from '@/components/sections/about/Gallery';
import PageHeaderComponent from '@/components/sections/about/PageHeader';
import Documents from '@/components/sections/about/Documents';

export const revalidate = 60;

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
  `);
}

async function getAboutStats() {
  return client.fetch<AboutStats>(`
    *[_type == "aboutStats"][0] {
      _type,
      clientCount,
      citiesCount,
      yearsExperience
    }
  `);
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
  `);
}

async function getDocuments() {
  return client.fetch<DocumentFile[]>(`
    *[_type == "documentFile"] | order(order asc) {
      _type,
      title,
      description,
      "file": {
        "asset": {
          "url": file.asset->url
        }
      },
      order
    }
  `);
}

async function getPageHeader() {
  return client.fetch<PageHeaders>(`
    *[_type == "pageHeaders"][0] {
      aboutHeader
    }
  `);
}

export default async function AboutPage() {
  const [achievements, stats, images, documents, header] = await Promise.all([
    getAchievements(),
    getAboutStats(),
    getAboutGallery(),
    getDocuments(),
    getPageHeader(),
  ]);

  return (
    <main className="min-h-screen bg-black pt-20">
      <PageHeaderComponent data={header.aboutHeader} />
      <Achievements achievements={achievements} stats={stats} />
      <Gallery images={images} />
      <Documents documents={documents} />
      <Reviews vkGroupUrl="https://vk.com/topic-27989407_42510853?offset=380" />
    </main>
  );
}
