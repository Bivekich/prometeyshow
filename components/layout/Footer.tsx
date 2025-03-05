'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Youtube } from 'lucide-react';
import { Contact } from '@/types/schema';

interface FooterProps {
  contact: Contact;
}

const navigation = {
  main: [
    { name: 'Главная', href: '/' },
    { name: 'О нас', href: '/about' },
    { name: 'Услуги', href: '/services' },
    { name: 'Галерея', href: '/gallery' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/contacts' },
  ],
  social: [
    {
      name: 'Instagram',
      key: 'instagram',
      icon: Instagram,
    },
    {
      name: 'ВКонтакте',
      key: 'vkontakte',
      icon: (props: any) => (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2ZM18.15 16.27H16.69C16.14 16.27 15.97 15.82 14.86 14.72C13.86 13.77 13.49 13.67 13.27 13.67C12.96 13.67 12.87 13.76 12.87 14.18V15.77C12.87 16.08 12.75 16.27 11.82 16.27C10.42 16.27 8.85 15.35 7.71 13.69C6.09 11.38 5.58 9.58 5.58 9.23C5.58 9.05 5.67 8.88 6.02 8.88H7.49C7.82 8.88 7.95 9.03 8.09 9.42C8.93 11.61 10.27 13.47 10.75 13.47C10.94 13.47 11.03 13.38 11.03 12.91V10.88C10.98 9.92 10.51 9.84 10.51 9.53C10.51 9.37 10.64 9.22 10.87 9.22H13.02C13.3 9.22 13.41 9.37 13.41 9.74V12.46C13.41 12.74 13.55 12.85 13.64 12.85C13.83 12.85 14.01 12.74 14.35 12.4C15.34 11.36 16.05 9.85 16.05 9.85C16.14 9.66 16.31 9.49 16.64 9.49H18.11C18.5 9.49 18.59 9.69 18.5 9.98C18.29 10.84 16.63 13.2 16.63 13.2C16.47 13.47 16.42 13.59 16.63 13.86C16.78 14.06 17.21 14.45 17.5 14.79C18.06 15.42 18.49 15.96 18.63 16.27C18.75 16.59 18.57 16.27 18.15 16.27Z" />
        </svg>
      ),
    },
    {
      name: 'Горько',
      key: 'gorko',
      icon: (props: any) => (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path d="M12 2L14.2451 8.90983H21.5106L15.6327 13.1803L17.8779 20.0902L12 15.8197L6.12215 20.0902L8.36729 13.1803L2.48944 8.90983H9.75486L12 2Z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      key: 'youtube',
      icon: Youtube,
    },
    {
      name: 'Rutube',
      key: 'rutube',
      icon: (props: any) => (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9.5 16.5V7.5L16.5 12L9.5 16.5Z" />
        </svg>
      ),
    },
  ],
};

const Footer = ({ contact }: FooterProps) => {
  return (
    <footer className="bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Компания */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Театр огня &ldquo;Прометей&rdquo;
            </h3>
            <p className="text-gray-400 mb-6">
              Профессиональное огненное и пиротехническое шоу для ваших
              мероприятий
            </p>
            <div className="flex space-x-4">
              {navigation.social.map((item) => {
                const href = contact.socialMedia?.[item.key as keyof typeof contact.socialMedia];
                if (!href) return null;
                return (
                  <a
                    key={item.name}
                    href={href}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Контакты</h3>
            <ul className="space-y-4">
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    {contact.phone}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  {contact.email}
                </a>
              </li>
              {contact.address && (
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{contact.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Театр огня &ldquo;Прометей&rdquo;. Все
            права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
