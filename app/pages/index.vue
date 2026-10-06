<script setup lang="ts">
import { sanityClient } from '../utils/sanity'

const query = `*[_type == "story"] | order(publishedDate desc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  author,
  publishedDate,
  featured,
  category,
  "imageUrl": featuredImage.asset->url
}`

const { data: stories, error } = await useAsyncData(
  'stories',
  () => sanityClient.fetch(query)
)

/*
  Separate stories using the Featured boolean
  stored in Sanity.
*/
const featuredStories = computed(() =>
  stories.value?.filter((story: any) => story.featured === true) || []
)

const regularStories = computed(() =>
  stories.value?.filter((story: any) => story.featured !== true) || []
)

/*
  Convert the database-friendly category value
  into readable text for the website.
*/
const formatCategory = (category: string) => {
  const categories: Record<string, string> = {
    education: 'Education',
    Education: 'Education',

    community: 'Community',
    Community: 'Community',

    'work-life': 'Work & Life',
    'Work-Life': 'Work & Life',

    'personal-growth': 'Personal Growth',
    'Personal-Growth': 'Personal Growth',

    environment: 'Environment',
    Environment: 'Environment',

    health: 'Health',
    Health: 'Health',
  }

  return categories[category] || category
}
</script>


<template>
  <main class="page">

    <!-- =========================
         NUS HEADER
    ========================== -->

    <header class="header">
      <img
        src="/Logo.png"
        alt="National University of Singapore"
        class="nus-logo"
      >
    </header>


    <!-- =========================
         HERO
    ========================== -->

    <section class="hero">

      <h1>Life is a story.</h1>

      <p class="hero-subtitle">
        What does yours say?
      </p>

      <img
        src="/collaborative.png"
        alt="People collaborating and sharing ideas"
        class="hero-image"
      >

    </section>


    <!-- =========================
         ERROR
    ========================== -->

    <p
      v-if="error"
      class="error-message"
    >
      Unable to load stories.
    </p>


    <!-- =========================
         FEATURED STORIES
    ========================== -->

    <section
      v-if="featuredStories.length"
      class="featured-section"
    >

      <div class="section-heading">

        <p class="section-label">
          Featured
        </p>

        <h2>
          Featured Stories
        </h2>

        <p class="section-description">
          Selected stories and experiences worth discovering.
        </p>

      </div>


      <div class="featured-grid">

        <article
          v-for="story in featuredStories"
          :key="story._id"
          class="featured-card"
        >

          <!-- Featured badge -->

          <div class="featured-badge">
            ★ Featured
          </div>


          <!-- Image -->

          <img
            v-if="story.imageUrl"
            :src="story.imageUrl"
            :alt="story.title"
            class="featured-image"
          >


          <!-- Content -->

          <div class="featured-content">

            <p class="story-category">
              {{ formatCategory(story.category) }}
            </p>


            <h3>
              {{ story.title }}
            </h3>


            <p class="story-summary">
              {{ story.summary }}
            </p>


            <p class="story-author">
              By {{ story.author }}
            </p>


            <NuxtLink
              :to="`/stories/${story.slug}`"
              class="read-button"
            >
              Read Story
            </NuxtLink>

          </div>

        </article>

      </div>

    </section>


    <!-- =========================
         STORIES OF IMPACT
    ========================== -->

    <section class="stories-section">

      <div class="section-heading">

        <h2>
          Stories of Impact
        </h2>

        <p class="section-description">
          Discover experiences, perspectives and moments that shape people's lives.
        </p>

      </div>


      <div
        v-if="regularStories.length"
        class="stories-grid"
      >

        <article
          v-for="story in regularStories"
          :key="story._id"
          class="story-card"
        >

          <!-- Image -->

          <img
            v-if="story.imageUrl"
            :src="story.imageUrl"
            :alt="story.title"
            class="story-image"
          >


          <!-- Content -->

          <div class="story-content">

            <h3>
              {{ story.title }}
            </h3>


            <p class="story-category">
              {{ formatCategory(story.category) }}
            </p>


            <p class="story-summary">
              {{ story.summary }}
            </p>


            <p class="story-author">
              By {{ story.author }}
            </p>


            <NuxtLink
              :to="`/stories/${story.slug}`"
              class="read-button"
            >
              Read Story
            </NuxtLink>

          </div>

        </article>

      </div>


      <p
        v-else
        class="empty-message"
      >
        More stories coming soon.
      </p>

    </section>


    <!-- =========================
         SHARE YOUR STORY
    ========================== -->

    <section class="share-story-section">

      <div class="share-story-content">

        <div class="share-story-text">

          <h2>
            Have a story to share?
          </h2>

          <p>
            Your experience could inspire someone.
          </p>

        </div>


        <!--
          Visual only for now.
          Later we can connect this to a
          Share Your Story / Contact form.
        -->

        <NuxtLink
  to="/share"
  class="share-story-button"
  aria-label="Share your story"
>
  →
</NuxtLink>

      </div>

    </section>

  </main>
</template>


<style scoped>

/* =========================
   PAGE
========================= */

.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 48px;

  font-family: Arial, Helvetica, sans-serif;

  color: #333333;
}


/* =========================
   HEADER
========================= */

.header {
  display: flex;
  align-items: center;
}

.nus-logo {
  width: 220px;
  height: auto;
}


/* =========================
   HERO
========================= */

.hero {
  margin-top: 55px;

  text-align: center;
}

.hero h1 {
  margin: 0;

  color: #003d7c;

  font-size: 48px;
  font-weight: 600;

  line-height: 1.15;
}

.hero-subtitle {
  margin: 12px 0 40px;

  color: #003d7c;

  font-size: 24px;
}

.hero-image {
  display: block;

  width: 100%;
  max-height: 460px;

  object-fit: cover;

  border-radius: 20px;
}


/* =========================
   COMMON SECTION HEADING
========================= */

.section-heading {
  margin-bottom: 40px;

  text-align: center;
}

.section-heading h2 {
  margin: 0 0 10px;

  color: #003d7c;

  font-size: 36px;
  font-weight: 600;
}

.section-label {
  margin: 0 0 8px;

  color: #ef7c00;

  font-size: 14px;
  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 1.5px;
}

.section-description {
  max-width: 650px;

  margin: 0 auto;

  color: #666666;

  font-size: 16px;

  line-height: 1.6;
}


/* =========================
   FEATURED SECTION
========================= */

.featured-section {
  padding: 65px 0 75px;
}


/* =========================
   FEATURED GRID
========================= */

.featured-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 35px;
}


/* =========================
   FEATURED CARD
========================= */

.featured-card {
  position: relative;

  display: flex;
  flex-direction: column;

  min-height: 100%;

  overflow: hidden;

  background: #f4f8fc;

  border: 2px solid #003d7c;

  border-radius: 20px;

  box-shadow:
    0 10px 28px rgba(0, 61, 124, 0.13);
}


/* =========================
   FEATURED BADGE
========================= */

.featured-badge {
  position: absolute;

  top: 18px;
  left: 18px;

  z-index: 2;

  padding: 8px 13px;

  background: #ef7c00;

  color: #ffffff;

  border-radius: 20px;

  font-size: 13px;
  font-weight: 700;
}


/* =========================
   FEATURED IMAGE
========================= */

.featured-image {
  display: block;

  width: 100%;
  height: 280px;

  object-fit: cover;
}


/* =========================
   FEATURED CONTENT
========================= */

.featured-content {
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 28px;

  text-align: left;
}

.featured-content h3 {
  margin: 0 0 15px;

  color: #004b8d;

  font-size: 28px;
  font-weight: 600;

  line-height: 1.3;
}


/* =========================
   STORIES OF IMPACT
========================= */

.stories-section {
  padding: 20px 0 80px;
}


/* =========================
   REGULAR STORY GRID
========================= */

.stories-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 40px;

  align-items: stretch;
}


/* =========================
   REGULAR STORY CARD
========================= */

.story-card {
  display: flex;
  flex-direction: column;

  height: 100%;

  box-sizing: border-box;

  padding: 35px;

  background: #ffffff;

  border: 1px solid #e5e5e5;

  border-radius: 18px;

  box-shadow:
    0 8px 24px rgba(0, 61, 124, 0.10);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.story-card:hover {
  transform: translateY(-5px);

  box-shadow:
    0 14px 30px rgba(0, 61, 124, 0.15);
}


/* =========================
   REGULAR STORY IMAGE
========================= */

.story-image {
  display: block;

  width: 145px;
  height: 145px;

  margin: 0 auto 28px;

  object-fit: cover;

  border: 4px solid #003d7c;

  border-radius: 50%;
}


/* =========================
   REGULAR CONTENT
========================= */

.story-content {
  display: flex;
  flex: 1;
  flex-direction: column;

  text-align: left;
}

.story-content h3 {
  margin: 0 0 8px;

  color: #004b8d;

  font-size: 25px;
  font-weight: 500;

  line-height: 1.3;
}


/* =========================
   CATEGORY
========================= */

.story-category {
  margin: 0 0 16px;

  color: #ef7c00;

  font-size: 16px;
  font-weight: 700;

  line-height: 1.4;
}


/* =========================
   SUMMARY
========================= */

.story-summary {
  margin: 0 0 18px;

  color: #333333;

  font-size: 16px;

  line-height: 1.65;
}


/* =========================
   AUTHOR
========================= */

.story-author {
  margin: 0 0 24px;

  color: #555555;

  font-size: 14px;

  line-height: 1.4;
}


/* =========================
   READ STORY
========================= */

.read-button {
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;

  box-sizing: border-box;

  margin-top: auto;

  padding: 15px 20px;

  background: #004b8d;

  color: #ffffff;

  border-radius: 8px;

  font-size: 16px;
  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.read-button:hover {
  background: #ef7c00;

  transform: translateY(-2px);
}


/* =========================
   EMPTY / ERROR
========================= */

.error-message,
.empty-message {
  margin-top: 30px;

  text-align: center;
}

.error-message {
  color: #b42318;
}

.empty-message {
  color: #666666;
}


/* =========================
   SHARE STORY CTA
========================= */

.share-story-section {
  padding: 5px 0 50px;
}

.share-story-content {
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 24px;

  padding: 18px 22px 18px 30px;

  background: #f6b866;

  border: 1px solid #003d7c;

  border-radius: 45px;
}

.share-story-text h2 {
  margin: 0 0 3px;

  color: #003d7c;

  font-size: 21px;
  font-weight: 700;
}

.share-story-text p {
  margin: 0;

  color: #333333;

  font-size: 15px;

  line-height: 1.4;
}

.share-story-button {
  display: flex;

  flex-shrink: 0;

  align-items: center;
  justify-content: center;

  width: 54px;
  height: 54px;

  padding: 0;

  background: #ffffff;

  color: #003d7c;

  border: none;

  border-radius: 50%;

  font-size: 28px;
  text-decoration: none;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.share-story-button:hover {
  transform: translateX(4px);

  background: #f5f5f5;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .page {
    padding: 24px 20px;
  }


  /* Header */

  .nus-logo {
    width: 170px;
  }


  /* Hero */

  .hero {
    margin-top: 40px;
  }

  .hero h1 {
    font-size: 36px;
  }

  .hero-subtitle {
    margin-bottom: 28px;

    font-size: 20px;
  }

  .hero-image {
    height: 280px;
  }


  /* Sections */

  .featured-section {
    padding: 50px 0 55px;
  }

  .stories-section {
    padding: 10px 0 60px;
  }

  .section-heading {
    margin-bottom: 30px;
  }

  .section-heading h2 {
    font-size: 30px;
  }


  /* Featured */

  .featured-grid {
    grid-template-columns: 1fr;

    gap: 28px;
  }

  .featured-image {
    height: 230px;
  }

  .featured-content {
    padding: 24px;
  }

  .featured-content h3 {
    font-size: 24px;
  }


  /* Regular Stories */

  .stories-grid {
    grid-template-columns: 1fr;

    gap: 28px;
  }

  .story-card {
    padding: 28px 22px;
  }

  .story-image {
    width: 125px;
    height: 125px;
  }

  .story-content h3 {
    font-size: 22px;
  }

  .story-summary {
    font-size: 15px;
  }


  /* CTA */

  .share-story-section {
    padding: 0 0 45px;
  }

  .share-story-content {
    gap: 15px;

    padding: 17px 16px 17px 22px;

    border-radius: 34px;
  }

  .share-story-text h2 {
    font-size: 18px;
  }

  .share-story-text p {
    font-size: 13px;
  }

  .share-story-button {
    width: 48px;
    height: 48px;
  
    font-size: 25px;
  }

}

</style>