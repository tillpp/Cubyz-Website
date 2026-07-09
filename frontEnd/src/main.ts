//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import siteIndex from "./pages/Index.vue"
import siteInformation from "./pages/information.vue"
import siteAddons from "./pages/addons.vue"
import siteServers from "./pages/servers.vue"
import siteAddonNew from "./pages/addonNew.vue"
import siteBlog from "./pages/blog.vue"
import siteWiki from "./pages/wiki.vue"
import siteForum from "./pages/forum.vue"

const routes = [
  { path: '/', component: siteIndex },
  { path: '/information', component: siteInformation },
  { path: '/addons', component: siteAddons },
  { path: '/addonNew', component: siteAddonNew },
  { path: '/servers', component: siteServers },
  { path: '/blog', component: siteBlog },
  { path: '/wiki', component: siteWiki },
  { path: '/forum', component: siteForum },
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})


createApp(App).use(router).mount('#app')
