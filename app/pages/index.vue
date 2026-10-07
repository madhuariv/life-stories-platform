<script setup lang="ts">
import { sanityClient } from '../utils/sanity'

const query = `*[_type == "story"] | order(featured desc, publishedDate desc) {
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
  <div class="site">

    <!-- =========================
         FULL-WIDTH HEADER
    ========================== -->

    <SiteHeader />


    <!-- =========================
         CENTERED PAGE CONTENT
    ========================== -->

    <main class="page">

      <!-- =========================
           HERO
      ========================== -->

      <section class="hero">

        <h1>
          Life is a story
        </h1>

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
           STORIES OF IMPACT
      ========================== -->

      <section class="stories-section">

        <div class="section-heading">

          <h2>
            Stories of Impact
          </h2>

          <p class="section-description">
            Different journeys. Shared experiences. Lasting impact.
          </p>

        </div>


        <!-- Error -->

        <p
          v-if="error"
          class="error-message"
        >
          Unable to load stories.
        </p>


        <!-- Stories -->

        <div
          v-else-if="stories?.length"
          class="stories-grid"
        >

          <article
            v-for="story in stories"
            :key="story._id"
            class="story-card"
            :class="{ 'featured-card': story.featured }"
          >

            <!-- Featured Badge -->

            <div
              v-if="story.featured"
              class="featured-badge"
            >
              ★ Featured
            </div>


            <!-- Image -->

            <div
              class="image-wrapper"
              :class="{
                'featured-image-wrapper': story.featured
              }"
            >

              <img
                v-if="story.imageUrl"
                :src="story.imageUrl"
                :alt="story.title"
                :class="
                  story.featured
                    ? 'featured-image'
                    : 'story-image'
                "
              >

            </div>


            <!-- Story Content -->

            <div class="story-content">

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


        <!-- Empty State -->

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

    <SiteFooter />
  </div>
</template>


<style scoped>

/* =========================
   SITE
========================= */

.site {
  width: 100%;
}


/* =========================
   CENTERED PAGE
========================= */

.page {
  max-width: 1200px;

  margin: 0 auto;

  padding: 0 48px 32px;

  box-sizing: border-box;

  color: #333333;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* =========================
   HERO
========================= */

.hero {
  margin-top: 35px;

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
  font-weight: 400;
}

.hero-image {
  display: block;

  width: 100%;
  max-height: 460px;

  object-fit: cover;

  border-radius: 20px;
}


/* =========================
   STORIES SECTION
========================= */

.stories-section {
  padding: 70px 0 80px;
}


/* =========================
   SECTION HEADING
========================= */

.section-heading {
  margin-bottom: 45px;

  text-align: center;
}

.section-heading h2 {
  margin: 0 0 12px;

  color: #003d7c;

  font-size: 38px;
  font-weight: 600;
}

.section-description {
  margin: 0;

  color: #555555;

  font-size: 18px;

  line-height: 1.6;
}


/* =========================
   STORY GRID
========================= */

.stories-grid {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 40px;

  align-items: stretch;
}


/* =========================
   STORY CARD
========================= */

.story-card {
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;

  box-sizing: border-box;

  overflow: hidden;

  background: #ffffff;

  border: 1px solid #e5e5e5;

  border-radius: 20px;

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
   FEATURED CARD
========================= */

.featured-card {
  background: #f4f8fc;

  border: 2px solid #003d7c;

  box-shadow:
    0 10px 28px rgba(0, 61, 124, 0.14);
}


/* =========================
   FEATURED BADGE
========================= */

.featured-badge {
  position: absolute;

  top: 18px;
  left: 18px;

  z-index: 3;

  padding: 8px 14px;

  background: #ef7c00;

  color: #ffffff;

  border-radius: 22px;

  font-size: 13px;
  font-weight: 700;
}


/* =========================
   IMAGE WRAPPER
========================= */

.image-wrapper {
  display: flex;

  align-items: center;
  justify-content: center;

  padding: 38px 30px 5px;
}

.featured-image-wrapper {
  padding: 0;
}


/* =========================
   REGULAR IMAGE
========================= */

.story-image {
  display: block;

  width: 150px;
  height: 150px;

  object-fit: cover;

  border: 4px solid #003d7c;

  border-radius: 50%;
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
   STORY CONTENT
========================= */

.story-content {
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 30px 34px 34px;

  text-align: left;
}


/* =========================
   CATEGORY
========================= */

.story-category {
  margin: 0 0 10px;

  color: #ef7c00;

  font-size: 16px;
  font-weight: 700;

  line-height: 1.4;
}


/* =========================
   TITLE
========================= */

.story-content h3 {
  margin: 0 0 16px;

  color: #004b8d;

  font-size: 25px;
  font-weight: 500;

  line-height: 1.3;
}

.featured-card .story-content h3 {
  font-size: 28px;
  font-weight: 600;
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
  margin: 0 0 25px;

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

  text-align: center;

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
   ERROR / EMPTY
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
    padding: 0 20px 24px;
  }


  /* Hero */

  .hero {
    margin-top: 25px;
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


  /* Stories */

  .stories-section {
    padding: 50px 0 60px;
  }

  .section-heading {
    margin-bottom: 32px;
  }

  .section-heading h2 {
    font-size: 30px;
  }

  .section-description {
    font-size: 16px;
  }


  /* Grid */

  .stories-grid {
    grid-template-columns: 1fr;

    gap: 28px;
  }


  /* Images */

  .featured-image {
    height: 230px;
  }

  .story-image {
    width: 125px;
    height: 125px;
  }


  /* Content */

  .story-content {
    padding: 26px 24px 28px;
  }

  .story-content h3 {
    font-size: 22px;
  }

  .featured-card .story-content h3 {
    font-size: 24px;
  }

  .story-summary {
    font-size: 15px;
  }


  /* Share CTA */

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