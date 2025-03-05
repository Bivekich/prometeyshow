import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mainPageSections',
  title: 'Main Page Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Наши услуги',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Создаем яркие и безопасные огненные шоу для любых мероприятий. Все выступления проводятся профессиональными артистами с соблюдением норм безопасности',
        },
      ],
    }),
    defineField({
      name: 'eventsSection',
      title: 'Events Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Ближайшие выступления',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Публичные мероприятия, на которых вы можете увидеть наши выступления. Для заказа индивидуального шоу свяжитесь с нами через форму ниже.',
        },
      ],
    }),
  ],
}) 