import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'object',
      fields: [
        {
          name: 'display',
          title: 'Display Text (e.g., "Пн-Вс: 10:00 - 20:00")',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'vkontakte',
          title: 'VKontakte URL',
          type: 'url',
        },
        {
          name: 'gorko',
          title: 'Gorko URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
        {
          name: 'rutube',
          title: 'Rutube URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'contactFormEnabled',
      title: 'Enable Contact Form',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'contactFormEmail',
      title: 'Contact Form Recipient Email',
      type: 'string',
      validation: (Rule) => 
        Rule.custom((email, context) => {
          if (context.document?.contactFormEnabled && !email) {
            return 'Email is required when contact form is enabled'
          }
          return true
        }),
    }),
    defineField({
      name: 'mapLocation',
      title: 'Map Location',
      type: 'object',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          title: 'Latitude',
        },
        {
          name: 'longitude',
          type: 'number',
          title: 'Longitude',
        },
      ],
    }),
  ],
}) 