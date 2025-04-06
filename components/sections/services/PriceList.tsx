'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { useModal } from '@/contexts/ModalContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PriceListItem } from '@/types/schema';

interface PriceListProps {
  fireItems: PriceListItem[];
  pyroItems: PriceListItem[];
}

export default function PriceList({
  fireItems = [],
  pyroItems = [],
}: PriceListProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { openOrderModal } = useModal();

  // Объединяем все услуги в один список
  const allItems = [...pyroItems];

  const sections = [
    {
      category: 'Наши услуги',
      items: allItems,
    },
  ];

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
            Прайс-лист
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Базовые цены на наши услуги. Для получения точного расчета стоимости
            свяжитесь с нами
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.category}>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {section.category}
                </h3>
                <div className="rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-900 border-b border-gray-800">
                        <TableHead className="text-white">Программа</TableHead>
                        <TableHead className="text-white">
                          Длительность
                        </TableHead>
                        <TableHead className="text-white text-right">
                          Стоимость
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.items && section.items.length > 0 ? (
                        section.items.map((item) => (
                          <TableRow
                            key={item.title}
                            className="border-b border-gray-800 hover:bg-gray-900/50"
                          >
                            <TableCell className="font-medium text-white">
                              {item.title}
                            </TableCell>
                            <TableCell className="text-gray-400">
                              {item.duration}
                            </TableCell>
                            <TableCell className="text-right text-red-500">
                              {item.price}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="text-center text-gray-400"
                          >
                            Нет доступных предложений в данной категории
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              * Указаны базовые цены. Финальная стоимость зависит от места
              проведения, сложности программы и дополнительных требований
            </p>
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => openOrderModal()}
            >
              Получить расчет стоимости
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
