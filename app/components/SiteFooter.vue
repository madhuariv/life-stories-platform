<template>
  <footer class="site-footer">

    <div class="footer-content">

      <h2>
        Life Stories
      </h2>

      <a
        href="mailto:hello@lifestories.example"
        class="footer-email"
      >
        <span class="mail-icon">✉</span>
        <span>hello@lifestories.example</span>
      </a>

      <p class="footer-bottom">
        Demo Site · 2026
      </p>

    </div>

  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  box-sizing: border-box;

  padding: 38px 20px 26px;

  background: #003d7c;
  color: #ffffff;

  font-family: Arial, Helvetica, sans-serif;
}

.footer-content {
  max-width: 1000px;
  margin: 0 auto;

  text-align: center;
}

.footer-content h2 {
  margin: 0 0 16px;

  color: #ffffff;

  font-family: Arial, Helvetica, sans-serif;

  font-size: 24px;
  font-weight: 600;

  line-height: 1.15;
}

.footer-email {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  margin-bottom: 20px;

  color: #ffffff;

  font-size: 15px;
  text-decoration: none;
}

.mail-icon {
  font-size: 17px;
  line-height: 1;
}

.footer-email:hover {
  text-decoration: underline;
}

.footer-bottom {
  margin: 0;

  color: rgba(255, 255, 255, 0.75);

  font-size: 13px;
}

@media (max-width: 768px) {

  .site-footer {
    padding: 32px 20px 24px;
  }

  .footer-content h2 {
    font-size: 18px;
  }

  .footer-email {
    font-size: 14px;
  }

}
</style>