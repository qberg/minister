import { ContentManagerAccess, EveryoneAccess } from '@/access/collection-level-access'
import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  access: {
    create: ContentManagerAccess,
    read: EveryoneAccess,
    update: ContentManagerAccess,
    delete: ContentManagerAccess,
  },
  admin: {
    group: 'Documents',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal label (e.g., Resume - John Doe)',
      },
    },
  ],
  upload: {
    mimeTypes: ['application/pdf'],
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (req.file && req.file.name) {
          const sanitizedName = req.file.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9.\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')

          if (sanitizedName) {
            data.filename = sanitizedName
          }
        }
        return data
      },
    ],
  },
}
