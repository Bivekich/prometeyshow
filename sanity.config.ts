import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Prometey Show',
  projectId: '54z0ld0n',
  dataset: 'production',
  basePath: '/studio',

  plugins: [
    deskTool(),
    visionTool(), // Adds the JSON Vision tool for exploring your data
  ],

  schema,
}) 