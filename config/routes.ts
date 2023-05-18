import { defineConfig } from 'umi'

export type Routes = ReturnType<typeof defineConfig>['routes']

export const routes: Routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: '@/pages/home' },
  { path: '/docs', component: '@/pages/docs' },
  { path: '/login', component: '@/pages/login' },
]
