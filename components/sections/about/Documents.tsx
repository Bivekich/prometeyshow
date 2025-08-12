'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText } from 'lucide-react';
import { DocumentFile } from '@/types/schema';
import StaticImage from '@/components/ui/StaticImage';

interface DocumentsProps {
  documents: DocumentFile[];
}

export default function Documents({ documents }: DocumentsProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Документы
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Официальные документы и сертификаты театра огня
            &ldquo;Прометей&rdquo;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 rounded-lg overflow-hidden group"
              >
                <div className="relative h-80 w-full">
                  {(() => {
                    const url = doc.file.asset.url || '';
                    const isPdf = url.toLowerCase().endsWith('.pdf');
                    const previewSrc = isPdf ? '/placeholder-image.svg' : url;
                    return (
                      <StaticImage
                        src={previewSrc}
                        alt={doc.title}
                        className="object-contain"
                        fill
                      />
                    );
                  })()}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={doc.file.asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Просмотреть</span>
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {doc.title}
                  </h3>
                  {doc.description && (
                    <p className="text-gray-400 text-sm">{doc.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
