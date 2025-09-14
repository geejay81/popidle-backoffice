import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { dashboardTool, projectInfoWidget, projectUsersWidget } from '@sanity/dashboard'
import { widgets } from './widgets'
import { ActivityIcon, PlayIcon } from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'PopIdle Backoffice',
  projectId: 'v6qz2c5y',
  dataset: 'production',

  plugins: [
    dashboardTool({ 
      name: 'dashboard',
      title: 'Dashboard',
      icon: ActivityIcon,
      widgets: [
      projectInfoWidget(),
      projectUsersWidget(),
    ]}),
    dashboardTool({ 
      name: 'game-dashboard',
      title: 'Game Info',
      icon: PlayIcon,
      widgets: [
      ...widgets
    ]}),
    structureTool(), 
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
