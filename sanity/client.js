import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'v6qz2c5y',
  dataset: 'production',
  apiVersion: '2024-04-18', // use current or a specific date
  useCdn: false, // or true depending on whether you want real-time updates
})
