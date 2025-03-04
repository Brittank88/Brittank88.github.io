<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import { onBeforeMount } from 'vue'
import { useMeta } from 'vue-meta'

const SITE_TITLE = "Brittank's Website"
const SITE_DESCRIPTION = "Brittank's personal website!"
const SITE_NOSCRIPT =
  'This website requires JavaScript to function correctly. Proceed at your own peril!'

onBeforeMount(() =>
  useMeta({
    title: SITE_TITLE,
    titleTemplate: (titleChunk: string) =>
      titleChunk ? `${titleChunk} | ${SITE_TITLE}` : SITE_TITLE,
    description: SITE_DESCRIPTION,
    htmlAttrs: { lang: 'en' },
    // bodyAttrs: { class: ['dark-mode'] }, //TODO: Add dark mode
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        property: 'og:title',
        content: SITE_TITLE,
        template: (titleChunk: string) =>
          titleChunk ? `${titleChunk} | ${SITE_TITLE}` : SITE_TITLE,
        vmid: 'og:title',
      },
    ],
    noscript: [{ innerHTML: SITE_NOSCRIPT }],
  }),
)
</script>

<template>
  <metainfo />
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
  <footer>
    <p>&copy; 2025 Brittank</p>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
