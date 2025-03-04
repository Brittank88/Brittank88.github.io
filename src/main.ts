import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// Big thanks to Charles Allen for a tutorial on using vue-meta with Vue 3:
// https://stackoverflow.com/a/67120044
import { createMetaManager } from 'vue-meta'

const app = createApp(App)
  .use(createPinia())
  .use(router)
  // @ts-expect-error - refreshOnceOnNavigation is not in the MetaConfig type.
  .use(createMetaManager(false, { refreshOnceOnNavigation: true }))

await router.isReady()
app.mount('#app')
