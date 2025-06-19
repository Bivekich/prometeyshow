import { cachedClient } from '@/lib/sanity';
import { GalleryPhoto, GalleryVideo, PageHeaders } from '@/types/schema';
import PhotoGallery from '@/components/sections/gallery/PhotoGallery';
import VideoGallery from '@/components/sections/gallery/VideoGallery';
import PageHeaderComponent from '@/components/sections/gallery/PageHeader';

export const revalidate = 60;

async function getGalleryPhotos() {
  return cachedClient.fetch<GalleryPhoto[]>(`
    *[_type == "galleryPhoto"] | order(order asc) {
      _type,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      },
      alt,
      category,
      order
    }
  `);
}

async function getGalleryVideos() {
  return cachedClient.fetch<GalleryVideo[]>(`
    *[_type == "galleryVideo"] | order(order asc) {
      _type,
      title,
      description,
      videoUrl,
      "videoFile": videoFile.asset->{
        url
      },
      "thumbnail": {
        "asset": {
          "url": thumbnail.asset->url
        }
      },
      order
    }
  `);
}

async function getPageHeader() {
  return cachedClient.fetch<PageHeaders>(`
    *[_type == "pageHeaders"][0] {
      galleryHeader
    }
  `);
}

export default async function GalleryPage() {
  const [photos, videos, header] = await Promise.all([
    getGalleryPhotos(),
    getGalleryVideos(),
    getPageHeader(),
  ]);

  return (
    <main className="min-h-screen bg-black pt-20">
      <PageHeaderComponent data={header?.galleryHeader} />
      <VideoGallery videos={videos} />
      <PhotoGallery photos={photos} />
    </main>
  );
}
