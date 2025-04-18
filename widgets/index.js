import GameStatsWidget from './GameStatsWidget'

/** @type {import('@sanity/dashboard').DashboardWidget[]} */
export const widgets = [
  {
    name: 'game-stats',
    component: GameStatsWidget,
    layout: { width: 'medium' },
  },
]
