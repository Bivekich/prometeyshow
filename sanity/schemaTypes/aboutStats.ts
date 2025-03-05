import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutStats',
  title: 'About Page Statistics',
  type: 'document',
  fields: [
    defineField({
      name: 'clientCount',
      title: 'Number of Clients',
      type: 'string',
      description: 'e.g., "500+"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'citiesCount',
      title: 'Number of Cities',
      type: 'string',
      description: 'e.g., "25"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'string',
      description: 'e.g., "8"',
      validation: (Rule) => Rule.required(),
    }),
  ],
}) 