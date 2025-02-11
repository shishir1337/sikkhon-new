import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'
import Link from 'next/link'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to Sikkhon CMS! 👋</h4>
      </Banner>
      Getting Started Guide:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <span>
            🔐 Set up your own account with your professional email and a strong password{' '}
            <Link href="/admin/collections/users/create"> here</Link>
          </span>
        </li>
        <li>
          <span>🔄 Sign out and sign back in to verify your credentials</span>
        </li>
        <li>
          <span>✨ You&apos;re all set! Start managing your content with confidence!</span>
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
