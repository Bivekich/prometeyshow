import { cachedClient } from '@/lib/sanity';
import {
  Service,
  SpecialOffer,
  PriceListItem,
  PageHeaders,
} from '@/types/schema';
import AllServices from '@/components/sections/services/AllServices';
import SpecialOffers from '@/components/sections/services/SpecialOffers';
import PriceList from '@/components/sections/services/PriceList';
import PageHeaderComponent from '@/components/sections/services/PageHeader';

export const revalidate = 60;

async function getServices() {
  return cachedClient.fetch<Service[]>(`
    *[_type == "service"] | order(order asc) {
      _type,
      title,
      slug,
      type,
      description,
      icon,
      duration,
      performers,
      height,
      "images": images[]{
        "asset": {
          "url": asset->url
        }
      },
      order
    }
  `);
}

async function getSpecialOffers() {
  return cachedClient.fetch<SpecialOffer[]>(`
    *[_type == "specialOffer"] | order(order asc) {
      _type,
      title,
      description,
      icon,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      },
      price,
      features,
      order
    }
  `);
}

async function getPriceList() {
  return cachedClient.fetch<PriceListItem[]>(`
    *[_type == "priceListItem"] | order(order asc) {
      _type,
      title,
      duration,
      price,
      type,
      order
    }
  `);
}

async function getPageHeader() {
  return cachedClient.fetch<PageHeaders>(`
    *[_type == "pageHeaders"][0] {
      servicesHeader
    }
  `);
}

export default async function ServicesPage() {
  const [services, specialOffers, priceList, header] = await Promise.all([
    getServices(),
    getSpecialOffers(),
    getPriceList(),
    getPageHeader(),
  ]);

  // Объединяем все услуги в один список без разделения на категории
  const allPrices = priceList;

  return (
    <main className="min-h-screen bg-black pt-20">
      <PageHeaderComponent data={header.servicesHeader} />
      <AllServices services={services} prices={allPrices} />
      <SpecialOffers offers={specialOffers} />
      <PriceList fireItems={[]} pyroItems={allPrices} />
    </main>
  );
}
