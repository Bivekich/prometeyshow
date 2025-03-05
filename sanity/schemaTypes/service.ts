import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Огненное шоу', value: 'fire' },
          { title: 'Пиротехническое шоу', value: 'pyro' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Sparkles', value: 'Sparkles' },
          { title: 'Star', value: 'Star' },
          { title: 'Target', value: 'Target' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "5-7 минут"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'performers',
      title: 'Number of Performers',
      type: 'string',
      description: 'e.g., "2-3 артиста"',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'string',
      description: 'e.g., "до 30 метров"',
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
}) 