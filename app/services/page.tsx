import { client } from '@/lib/sanity.client'
import { Service, SpecialOffer, PriceListItem, PageHeaders } from '@/types/schema'
import FireShow from '@/components/sections/services/FireShow';
import PyroShow from '@/components/sections/services/PyroShow';
import SpecialOffers from '@/components/sections/services/SpecialOffers';
import PriceList from '@/components/sections/services/PriceList';
import PageHeaderComponent from '@/components/sections/services/PageHeader';

export const revalidate = 60

async function getServices() {
  return client.fetch<Service[]>(`
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
  `)
}

async function getSpecialOffers() {
  return client.fetch<SpecialOffer[]>(`
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
  `)
}

async function getPriceList() {
  return client.fetch<PriceListItem[]>(`
    *[_type == "priceListItem"] | order(order asc) {
      _type,
      title,
      duration,
      price,
      type,
      order
    }
  `)
}

async function getPageHeader() {
  return client.fetch<PageHeaders>(`
    *[_type == "pageHeaders"][0] {
      servicesHeader
    }
  `)
}

export default async function ServicesPage() {
  const [services, specialOffers, priceList, header] = await Promise.all([
    getServices(),
    getSpecialOffers(),
    getPriceList(),
    getPageHeader(),
  ])

  const fireServices = services.filter(service => service.type === 'fire')
  const pyroServices = services.filter(service => service.type === 'pyro')
  const firePrices = priceList.filter(item => item.type === 'fire')
  const pyroPrices = priceList.filter(item => item.type === 'pyro')

  return (
    <main className="min-h-screen bg-black pt-20">
      <PageHeaderComponent data={header.servicesHeader} />
      <FireShow services={fireServices} prices={firePrices} />
      <PyroShow services={pyroServices} prices={pyroPrices} />
      <SpecialOffers offers={specialOffers} />
      <PriceList fireItems={firePrices} pyroItems={pyroPrices} />
    </main>
  )
}
