<script setup lang="ts">
const name = ref('')
const email = ref('')
const title = ref('')
const story = ref('')
const consent = ref(false)

const submitted = ref(false)

const submitStory = () => {
  if (
    !name.value ||
    !email.value ||
    !title.value ||
    !story.value ||
    !consent.value
  ) {
    return
  }

  console.log('Story submission:', {
    name: name.value,
    email: email.value,
    title: title.value,
    story: story.value,
    consent: consent.value
  })

  submitted.value = true
}
</script>

<template>
  <main class="share-page">

    <!-- NUS Logo -->
    <header class="header">
      <NuxtLink to="/">
        <img
          src="/Logo.png"
          alt="National University of Singapore"
          class="nus-logo"
        >
      </NuxtLink>
    </header>

    <!-- Back -->
    <NuxtLink
      to="/"
      class="back-link"
    >
      ← Back to Stories
    </NuxtLink>

    <!-- Form -->
    <section class="form-section">

      <div v-if="!submitted">

        <p class="section-label">
          Share Your Experience
        </p>

        <h1>Share Your Story</h1>

        <p class="intro">
          Every experience has a story behind it.
          We'd love to hear yours.
        </p>

        <form @submit.prevent="submitStory">

          <div class="form-group">
            <label for="name">
              Name
            </label>

            <input
              id="name"
              v-model="name"
              type="text"
              required
              placeholder="Your name"
            >
          </div>

          <div class="form-group">
            <label for="email">
              Email
            </label>

            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="your@email.com"
            >
          </div>

          <div class="form-group">
            <label for="title">
              Story Title
            </label>

            <input
              id="title"
              v-model="title"
              type="text"
              required
              placeholder="Give your story a title"
            >
          </div>

          <div class="form-group">
            <label for="story">
              Your Story
            </label>

            <textarea
              id="story"
              v-model="story"
              required
              rows="8"
              placeholder="Tell us your story..."
            />
          </div>

          <label class="consent">
            <input
              v-model="consent"
              type="checkbox"
              required
            >

            <span>
              I understand that my submission will be
              reviewed before being considered for publication.
            </span>
          </label>

          <button
            type="submit"
            class="submit-button"
          >
            Submit Story
          </button>

        </form>

      </div>

      <!-- Success -->
      <div
        v-else
        class="success-message"
      >
        <div class="success-icon">
          ✓
        </div>

        <h1>Thank you for sharing.</h1>

        <p>
          Your story has been received for this demonstration.
        </p>

        <NuxtLink
          to="/"
          class="home-button"
        >
          Back to Stories
        </NuxtLink>
      </div>

    </section>

  </main>
</template>

<style scoped>
.share-page {
  max-width: 850px;
  margin: 0 auto;
  padding: 32px 48px 80px;

  color: #333333;

  font-family: Arial, Helvetica, sans-serif;
}

.header {
  margin-bottom: 50px;
}

.nus-logo {
  width: 220px;
  height: auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 35px;

  color: #004b8d;

  font-size: 15px;
  font-weight: 600;

  text-decoration: none;
}

.back-link:hover {
  color: #ef7c00;
}

.form-section {
  padding: 45px;

  background: #ffffff;

  border: 1px solid #e5e5e5;
  border-radius: 20px;

  box-shadow:
    0 10px 30px rgba(0, 61, 124, 0.10);
}

.section-label {
  margin: 0 0 8px;

  color: #ef7c00;

  font-size: 14px;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 1.5px;
}

h1 {
  margin: 0 0 15px;

  color: #003d7c;

  font-size: 42px;
  font-weight: 600;
}

.intro {
  margin: 0 0 35px;

  color: #555555;

  font-size: 18px;
  line-height: 1.6;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;

  margin-bottom: 8px;

  color: #003d7c;

  font-size: 15px;
  font-weight: 700;
}

input,
textarea {
  width: 100%;

  box-sizing: border-box;

  padding: 13px 15px;

  border: 1px solid #cccccc;
  border-radius: 8px;

  color: #333333;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

input:focus,
textarea:focus {
  outline: 2px solid #004b8d;
  outline-offset: 1px;

  border-color: #004b8d;
}

textarea {
  resize: vertical;
}

.consent {
  display: flex;

  align-items: flex-start;

  gap: 10px;

  margin: 5px 0 30px;

  color: #555555;

  font-size: 14px;
  line-height: 1.5;
}

.consent input {
  width: auto;

  margin-top: 3px;
}

.submit-button {
  width: 100%;

  padding: 15px 20px;

  background: #004b8d;

  color: #ffffff;

  border: none;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;
}

.submit-button:hover {
  background: #ef7c00;
}


/* Success */

.success-message {
  padding: 30px 10px;

  text-align: center;
}

.success-icon {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 65px;
  height: 65px;

  margin: 0 auto 25px;

  background: #003d7c;

  color: #ffffff;

  border-radius: 50%;

  font-size: 30px;
}

.success-message p {
  margin-bottom: 30px;

  color: #555555;

  font-size: 17px;
}

.home-button {
  display: inline-block;

  padding: 13px 22px;

  background: #004b8d;

  color: #ffffff;

  border-radius: 8px;

  font-weight: 600;

  text-decoration: none;
}


/* Mobile */

@media (max-width: 768px) {

  .share-page {
    padding: 24px 20px 60px;
  }

  .header {
    margin-bottom: 35px;
  }

  .nus-logo {
    width: 170px;
  }

  .form-section {
    padding: 28px 22px;
  }

  h1 {
    font-size: 34px;
  }

  .intro {
    font-size: 16px;
  }
}
</style>