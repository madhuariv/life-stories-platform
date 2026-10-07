<template>
  <div class="app-root">
    <NuxtPage />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#__nuxt,
.app-root {
  width: 100%;
  min-height: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

html,
body {
  overflow-x: hidden;
}

body {
  min-width: 320px;

  font-family: Arial, Helvetica, sans-serif;

  background: #ffffff;
}

#__nuxt,
.app-root {
  display: block;
}
</style>