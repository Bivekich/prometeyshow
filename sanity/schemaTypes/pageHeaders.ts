import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pageHeaders',
  title: 'Page Headers',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutHeader',
      title: 'About Page Header',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'О театре огня "Прометей"',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Мы создаем незабываемые огненные шоу, которые покоряют сердца зрителей и делают каждое мероприятие особенным',
        },
      ],
    }),
    defineField({
      name: 'blogHeader',
      title: 'Blog Page Header',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Блог',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Узнайте больше о нашей работе, интересных событиях и новостях из мира огненного шоу',
        },
      ],
    }),
    defineField({
      name: 'contactsHeader',
      title: 'Contacts Page Header',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Контакты',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Свяжитесь с нами для обсуждения вашего мероприятия или получения дополнительной информации',
        },
      ],
    }),
    defineField({
      name: 'galleryHeader',
      title: 'Gallery Page Header',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Галерея',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'Коллекция наших лучших выступлений, фотографий и видео',
        },
      ],
    }),
    defineField({
      name: 'servicesHeader',
      title: 'Services Page Header',
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
          initialValue: 'Профессиональные огненные и пиротехнические шоу для любых мероприятий',
        },
      ],
    }),
  ],
}) 