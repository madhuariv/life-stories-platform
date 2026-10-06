import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'xy5bhrn5',
  dataset: 'production',
  apiVersion: '2026-10-05',
  useCdn: true,
})