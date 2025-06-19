import ContactForm from '@/components/sections/contacts/ContactForm';
import WorkingCities from '@/components/sections/contacts/WorkingCities';
import ContactInfo from '@/components/sections/contacts/ContactInfo';
import FAQ from '@/components/sections/contacts/FAQ';
import { cachedClient } from '@/lib/sanity'
import PageHeader from '@/components/sections/contacts/PageHeader';
import { Contact, WorkingCity, FAQ as FAQType, PageHeaders } from '@/types/schema';

export const revalidate = 60;

async function getContactInfo() {
  return cachedClient.fetch<Contact>(`
    *[_type == "contact"][0] {
      title,
      email,
      phone,
      address,
      workingHours,
      socialMedia,
      contactFormEnabled,
      contactFormEmail,
      mapLocation
    }
  `)
}

async function getWorkingCities() {
  return cachedClient.fetch<WorkingCity[]>(`
    *[_type == "workingCity"] | order(order asc) {
      _type,
      name,
      performances,
      description,
      "image": image.asset->url,
      order
    }
  `)
}

async function getFAQs() {
  return cachedClient.fetch<FAQType[]>(`
    *[_type == "faq"] | order(order asc) {
      _type,
      question,
      answer,
      category,
      order
    }
  `)
}

async function getPageHeader() {
  return cachedClient.fetch<PageHeaders>(`
    *[_type == "pageHeaders"][0] {
      contactsHeader
    }
  `)
}

export default async function ContactsPage() {
  const [contactInfo, workingCities, faqs, header] = await Promise.all([
    getContactInfo(),
    getWorkingCities(),
    getFAQs(),
    getPageHeader()
  ])

  return (
    <main className="min-h-screen bg-black pt-20">
      <PageHeader data={header?.contactsHeader} />
      <ContactInfo contact={contactInfo} />
      <WorkingCities cities={workingCities} />
      <ContactForm />
      <FAQ faqs={faqs} />
    </main>
  )
}
