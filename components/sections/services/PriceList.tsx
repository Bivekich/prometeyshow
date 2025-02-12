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

const prices = [
  {
    category: 'Огненное шоу',
    items: [
      {
        name: 'Сольное выступление',
        duration: '5-7 минут',
        price: 'от 15 000 ₽',
      },
      {
        name: 'Групповое шоу (2 артиста)',
        duration: '7-10 минут',
        price: 'от 25 000 ₽',
      },
      {
        name: 'Групповое шоу (4 артиста)',
        duration: '10-15 минут',
        price: 'от 45 000 ₽',
      },
    ],
  },
  {
    category: 'Пиротехническое шоу',
    items: [
      {
        name: 'Наземный фейерверк',
        duration: '3-5 минут',
        price: 'от 30 000 ₽',
      },
      {
        name: 'Высотный фейерверк',
        duration: '5-7 минут',
        price: 'от 50 000 ₽',
      },
      {
        name: 'Комбинированное шоу',
        duration: '7-10 минут',
        price: 'от 80 000 ₽',
      },
    ],
  },
];

const PriceList = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { openOrderModal } = useModal();

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
            {prices.map((section) => (
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
                      {section.items.map((item) => (
                        <TableRow
                          key={item.name}
                          className="border-b border-gray-800 hover:bg-gray-900/50"
                        >
                          <TableCell className="font-medium text-white">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {item.duration}
                          </TableCell>
                          <TableCell className="text-right text-red-500">
                            {item.price}
                          </TableCell>
                        </TableRow>
                      ))}
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
};

export default PriceList;
