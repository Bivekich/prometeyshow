'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const contactInfo = [
  {
    icon: Phone,
    title: 'Телефон',
    content: '+7 (900) 123-45-67',
    link: 'tel:+79001234567',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@prometey.ru',
    link: 'mailto:info@prometey.ru',
  },
  {
    icon: MapPin,
    title: 'Адрес',
    content: 'Санкт-Петербург, ул. Примерная, д. 1',
    link: null,
  },
  {
    icon: Clock,
    title: 'Время работы',
    content: 'Пн-Вс: 10:00 - 20:00',
    link: null,
  },
];

const socialMedia = [
  {
    name: 'Instagram',
    icon: Instagram,
    href: '#',
  },
  {
    name: 'ВКонтакте',
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
    href: '#',
  },
  {
    name: 'Горько',
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
    href: '#',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    href: '#',
  },
  {
    name: 'Rutube',
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
    href: '#',
  },
];

const ContactInfo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 hover:border-red-500/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-gray-400">{item.content}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Социальные сети */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">
              Мы в социальных сетях
            </h3>
            <div className="flex justify-center space-x-6">
              {socialMedia.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  <item.icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
