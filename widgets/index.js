import GameStatsWidget from './GameStatsWidget'
import PreviousPlaysWidget from './PreviousPlaysWidget'

/** @type {import('@sanity/dashboard').DashboardWidget[]} */
export const widgets = [
  {
    name: 'game-stats',
    component: GameStatsWidget,
    layout: { width: 'medium' },
  },
  {
    name: 'previous-plays',
    component: PreviousPlaysWidget,
    layout: { width: 'large' },
  }
]
