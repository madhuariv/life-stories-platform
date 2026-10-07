<template>
  <header class="site-header">

    <div class="header-content">

      <span class="site-name">
        DEMO SITE
      </span>

      <NuxtLink
        to="/faq"
        class="nav-link"
      >
        FAQ
      </NuxtLink>

    </div>

  </header>
</template>

<style scoped>
.site-header {
  width: 100vw;

  margin: 0;
  margin-left: calc(50% - 50vw);

  padding: 0;

  box-sizing: border-box;

  background: #003d7c;
}

.header-content {
  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  box-sizing: border-box;

  padding: 22px 48px;
}

.site-name {
  color: #ffffff;

  font-family: Arial, Helvetica, sans-serif;

  font-size: 22px;
  font-weight: 700;

  letter-spacing: 0.5px;
}

.nav-link {
  color: #ffffff;

  font-family: Arial, Helvetica, sans-serif;

  font-size: 16px;
  font-weight: 600;

  text-decoration: none;
}

.nav-link:hover {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .header-content {
    padding: 18px 20px;
  }

  .site-name {
    font-size: 19px;
  }

  .nav-link {
    font-size: 15px;
  }
}
</style>