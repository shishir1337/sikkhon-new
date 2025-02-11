import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const isAdminOrEditor: isAuthenticated = ({ req: { user } }) => {
  if (!user) return false

  // Check if user has either admin or editor role
  return user.role === 'admin' || user.role === 'editor'
}
