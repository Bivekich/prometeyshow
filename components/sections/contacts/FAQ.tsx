'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'Как заказать огненное шоу?',
    answer:
      'Чтобы заказать шоу, заполните форму обратной связи на сайте или позвоните нам по телефону. Наш менеджер свяжется с вами для обсуждения деталей и составления программы выступления.',
  },
  {
    question: 'За какое время нужно бронировать шоу?',
    answer:
      'Рекомендуем бронировать шоу за 2-3 недели до мероприятия. В высокий сезон (май-сентябрь) лучше сделать это за месяц.',
  },
  {
    question: 'Какие требования к площадке для выступления?',
    answer:
      'Необходима ровная площадка размером от 6х6 метров, безопасное расстояние до зрителей - минимум 3 метра. Для пиротехнического шоу требования могут быть другими.',
  },
  {
    question: 'Выступаете ли вы в помещениях?',
    answer:
      'Да, у нас есть специальные программы для выступлений в помещениях с соблюдением всех норм безопасности. Необходимо предварительное согласование с площадкой.',
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer:
      'Мы принимаем наличные, безналичный расчет для физических и юридических лиц. Предоплата составляет 50% от стоимости шоу.',
  },
  {
    question: 'Что будет в случае плохой погоды?',
    answer:
      'В случае неблагоприятных погодных условий мы можем перенести выступление на другую дату или предложить альтернативную программу.',
  },
];

const FAQ = () => {
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
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            Часто задаваемые вопросы
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Ответы на самые популярные вопросы о наших услугах
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-gray-900 border border-gray-800 rounded-lg"
                >
                  <AccordionTrigger className="px-6 text-white hover:text-red-500">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
