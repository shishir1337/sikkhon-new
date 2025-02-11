import type React from 'react'
import { Facebook, Twitter, Linkedin, Github, Link } from 'lucide-react'

type SizableIcon = React.ComponentType<{ size: number }>

type SocialMediaPlatform = 'facebook' | 'twitter' | 'linkedin' | 'github' | 'other'

interface SocialMediaIconProps {
  platform: SocialMediaPlatform
  size?: number
}

const iconMap: Record<SocialMediaPlatform, SizableIcon> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  other: Link,
}

export const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ platform, size = 24 }) => {
  const Icon = iconMap[platform] || Link
  return <Icon size={size} />
}
