import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Item',
    plural: 'FAQ Items',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
      }),
    },
  ],
}

export const FAQBlock: Block = {
  slug: 'faqBlock',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'faqItems',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => defaultFeatures,
          }),
        },
      ],
    },
  ],
}
