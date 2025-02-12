'use client';

import { useModal } from '@/contexts/ModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  email: z.string().email('Введите корректный email'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
});

const OrderModal = () => {
  const { isOrderModalOpen, closeOrderModal } = useModal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `🎉 Новая заявка!\n\n👤 Имя: ${values.name}\n📞 Телефон: ${values.phone}\n📧 Email: ${values.email}\n\n💬 Сообщение:\n${values.message}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки');
      }

      toast({
        title: 'Успешно!',
        description:
          'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.',
        variant: 'default',
      });

      closeOrderModal();
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      toast({
        title: 'Ошибка!',
        description:
          'Не удалось отправить заявку. Пожалуйста, попробуйте позже.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOrderModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-2xl bg-gray-950 rounded-lg p-8"
          >
            <button
              onClick={closeOrderModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-2">
              Заказать шоу
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Заполните форму, и мы свяжемся с вами для обсуждения деталей
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Имя</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите ваше имя"
                          className="bg-gray-900 border-gray-800 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Телефон</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+7 (___) ___-__-__"
                          className="bg-gray-900 border-gray-800 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@mail.com"
                          className="bg-gray-900 border-gray-800 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Сообщение</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Опишите ваше мероприятие"
                          className="bg-gray-900 border-gray-800 text-white min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Отправить
                </Button>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
