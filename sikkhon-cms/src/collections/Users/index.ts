import type { AccessArgs, CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { User } from '@/payload-types'
import { authenticated } from '@/access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: ({ req: { user }, data }: AccessArgs<User>) => {
      if (!user) return false
      if (user.role === 'admin') return true

      if (user.role === 'editor') {
        if (data?.role === 'admin') return false
        return true
      }

      return false
    },
    delete: async ({ req: { user, payload }, id }: AccessArgs<User>) => {
      if (!user) return false
      if (user.role === 'admin') return false

      if (!id) return false
      const userToDelete = await payload.findByID({
        collection: 'users',
        id: id,
      })

      if (user.role === 'editor' && userToDelete.role !== 'admin') {
        return true
      }
      return false
    },
    read: authenticated,
    update: async ({ req: { user, data, payload }, id }: AccessArgs<User>) => {
      if (user?.role === 'admin') {
        return true
      }

      if (!user || !id) return false

      // Fetch the user being updated
      const userToUpdate = await payload.findByID({
        collection: 'users',
        id: id,
      })

      if (user.role === 'editor') {
        // Editor can't update admin users
        if (userToUpdate?.role === 'admin') return false
        // Editor can't change roles
        if (data?.role && data.role !== userToUpdate?.role) return false
        return true
      }
      return false
    },
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload a profile picture',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
      admin: {
        description: 'A brief description about yourself',
      },
    },
    {
      name: 'designation',
      type: 'text',
      required: false,
      admin: {
        description: 'Your role or job title',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Content Writer', value: 'content-writer' }, // access to all without admin management
        { label: 'Editor', value: 'editor' }, // can manage posts only
        { label: 'Admin', value: 'admin' }, // boss
      ],
      required: true,
      defaultValue: 'editor',
      // access: {
      //   read: ({ req: { user }, data, siblingData }) => {
      //     if (!user) return false

      //     if (user.role === 'admin') return true

      //     if (user.role === 'editor') {
      //       console.log('siblingData ', siblingData)
      //       if (data?.role === 'admin') return false
      //       return true
      //     }
      //     return false
      //   },
      // },
    },
    {
      name: 'socialMedia',
      type: 'array',
      label: 'Social Media Links',
      minRows: 0,
      maxRows: 5,
      labels: {
        singular: 'Social Media Link',
        plural: 'Social Media Links',
      },
      admin: {
        description: 'Add your social media links (optional)',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Enter the full URL to your profile',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
