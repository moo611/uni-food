import App from './App'
import Tabs from "@/components/tabs.vue";
import NavBar from "@/components/navbar.vue"

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component("Tabs", Tabs);
  app.component("NavBar",NavBar)
  return {
    app
  }
}
// #endif