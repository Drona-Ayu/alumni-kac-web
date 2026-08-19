import type { HomeContent } from './types'

/** What the home page leads with, and where it sends people first. */
export const home: HomeContent = {
  heroPhoto: 'entrance',

  /* Named for what is behind them, not for safe umbrellas (§16). Every one of
     these points at a page that exists — a tile that goes nowhere is worse
     than no tile. */
  quickLinks: [
    {
      to: '/committee',
      label: 'Committee',
      description: 'Who runs the association',
      icon: 'people',
    },
    {
      to: '/events',
      label: 'Events',
      description: 'Meetings, CMEs and camps',
      icon: 'calendar',
    },
    {
      to: '/gallery',
      label: 'Gallery',
      description: 'Photographs from campus',
      icon: 'images',
    },
    {
      to: '/membership',
      label: 'Membership',
      description: 'Join the register',
      icon: 'card',
    },
    {
      to: '/contact',
      label: 'Contact',
      description: 'Reach the committee',
      icon: 'mail',
    },
  ],
}
