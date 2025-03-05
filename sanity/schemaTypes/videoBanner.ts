import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoBanner',
  title: 'Video Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
  ],
}) 