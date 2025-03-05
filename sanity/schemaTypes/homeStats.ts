import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homeStats',
  title: 'Home Page Statistics',
  type: 'document',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'value', type: 'number', title: 'Value' },
            { name: 'suffix', type: 'string', title: 'Suffix' },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(4).max(4),
    }),
  ],
}) 