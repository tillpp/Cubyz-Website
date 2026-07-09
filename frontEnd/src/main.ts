//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', component:            () => import("./pages/Index.vue") },
  { path: '/information', component: () => import("./pages/information.vue") },
  { path: '/addons', component:      () => import("./pages/addons.vue") },
  { path: '/addonNew', component:    () => import("./pages/addonNew.vue") },
  { path: '/servers', component:     () => import("./pages/servers.vue") },
  { path: '/blog', component:        () => import("./pages/blog.vue") },
  { path: '/wiki', component:        () => import("./pages/wiki.vue") },
  { path: '/forum', component:       () => import("./pages/forum.vue") },
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})


createApp(App).use(router).mount('#app')
