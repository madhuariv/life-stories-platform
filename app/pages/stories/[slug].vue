<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import { sanityClient } from '../../utils/sanity'

const route = useRoute()

const slug = computed(() => route.params.slug as string)

const query = `*[
  _type == "story" &&
  slug.current == $slug
][0]{
  _id,
  title,
  summary,
  author,
  publishedDate,
  category,
  "imageUrl": featuredImage.asset->url,
  body
}`

const { data: story, error } = await useAsyncData(
  () => `story-${slug.value}`,
  () =>
    sanityClient.fetch(query, {
      slug: slug.value
    }),
  {
    watch: [slug]
  }
)


/* =========================
   CATEGORY FORMATTING
========================= */

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


/* =========================
   DATE FORMATTING
========================= */

const formatDate = (date: string) => {
  if (!date) return ''

  return new Date(date).toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}


/* =========================
   BONUS:
   FIRST-PARTY ANALYTICS
========================= */

let startTime = 0

const trackedScrollDepths = new Set<number>()


/*
  Checks how far the reader has
  scrolled through the page.
*/

const trackScrollDepth = () => {
  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop

  const scrollableHeight =
    document.documentElement.scrollHeight -
    window.innerHeight

  if (scrollableHeight <= 0) {
    return
  }

  const scrollPercentage =
    Math.round(
      (scrollTop / scrollableHeight) * 100
    )

  const milestones = [
    25,
    50,
    75,
    100
  ]

  milestones.forEach((milestone) => {

    if (
      scrollPercentage >= milestone &&
      !trackedScrollDepths.has(milestone)
    ) {

      trackedScrollDepths.add(milestone)

      console.log(
        `[Analytics] Scroll depth: ${milestone}%`,
        {
          story: story.value?.title,
          slug: slug.value
        }
      )
    }

  })
}


/*
  Runs when the story page
  appears in the browser.
*/

onMounted(() => {

  startTime = Date.now()

  console.log(
    '[Analytics] Story viewed',
    {
      story: story.value?.title,
      slug: slug.value
    }
  )

  window.addEventListener(
    'scroll',
    trackScrollDepth
  )

})


/*
  Runs when the reader leaves
  the story page.
*/

onBeforeUnmount(() => {

  window.removeEventListener(
    'scroll',
    trackScrollDepth
  )

  const secondsSpent =
    Math.round(
      (Date.now() - startTime) / 1000
    )

  console.log(
    '[Analytics] Time spent on story',
    {
      story: story.value?.title,
      slug: slug.value,
      seconds: secondsSpent
    }
  )

})
</script>


<template>
  <main class="story-page">

    <!-- =========================
         NUS HEADER
    ========================== -->

    <header class="header">

      <NuxtLink to="/">

        <img
          src="/Logo.png"
          alt="National University of Singapore"
          class="nus-logo"
        >

      </NuxtLink>

    </header>


    <!-- =========================
         BACK TO STORIES
    ========================== -->

    <NuxtLink
      to="/"
      class="back-link"
    >
      ← Back to Stories
    </NuxtLink>


    <!-- =========================
         ERROR
    ========================== -->

    <div
      v-if="error"
      class="error-message"
    >

      <h2>
        Unable to load this story.
      </h2>

      <p>
        Please try refreshing the page.
      </p>

    </div>


    <!-- =========================
         STORY
    ========================== -->

    <article
      v-else-if="story"
      class="story"
    >

      <!-- Category -->

      <p class="category">
        {{ formatCategory(story.category) }}
      </p>


      <!-- Title -->

      <h1>
        {{ story.title }}
      </h1>


      <!-- Author + Date -->

      <div class="story-meta">

        <span>
          By {{ story.author }}
        </span>

        <span
          v-if="story.publishedDate"
          class="meta-divider"
        >
          •
        </span>

        <span v-if="story.publishedDate">
          {{ formatDate(story.publishedDate) }}
        </span>

      </div>


      <!-- Summary -->

      <p
        v-if="story.summary"
        class="story-intro"
      >
        {{ story.summary }}
      </p>


      <!-- Featured Image -->

      <img
        v-if="story.imageUrl"
        :src="story.imageUrl"
        :alt="story.title"
        class="featured-image"
      >


      <!-- Full Story -->

      <div class="story-body">

        <PortableText
          v-if="story.body"
          :value="story.body"
        />

      </div>


      <!-- Bottom Navigation -->

      <div class="story-footer">

        <NuxtLink
          to="/"
          class="back-button"
        >
          ← Back to Stories
        </NuxtLink>

      </div>

    </article>


    <!-- =========================
         LOADING
    ========================== -->

    <p
      v-else
      class="loading-message"
    >
      Loading story...
    </p>

  </main>
</template>


<style scoped>

/* =========================
   PAGE
========================= */

.story-page {
  max-width: 1000px;

  margin: 0 auto;

  padding: 32px 48px 80px;

  color: #333333;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* =========================
   HEADER
========================= */

.header {
  display: flex;

  align-items: center;

  margin-bottom: 55px;
}

.nus-logo {
  width: 220px;

  height: auto;
}


/* =========================
   BACK LINK
========================= */

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


/* =========================
   CATEGORY
========================= */

.category {
  margin: 0 0 12px;

  color: #ef7c00;

  font-size: 16px;

  font-weight: 700;

  line-height: 1.4;
}


/* =========================
   TITLE
========================= */

.story h1 {
  max-width: 850px;

  margin: 0 0 18px;

  color: #003d7c;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 48px;

  font-weight: 600;

  line-height: 1.15;
}


/* =========================
   AUTHOR + DATE
========================= */

.story-meta {
  display: flex;

  flex-wrap: wrap;

  align-items: center;

  gap: 9px;

  margin-bottom: 30px;

  color: #666666;

  font-size: 15px;
}

.meta-divider {
  color: #ef7c00;
}


/* =========================
   SUMMARY
========================= */

.story-intro {
  max-width: 800px;

  margin: 0 0 35px;

  color: #444444;

  font-size: 20px;

  line-height: 1.65;
}


/* =========================
   FEATURED IMAGE
========================= */

.featured-image {
  display: block;

  width: 100%;

  max-height: 520px;

  margin-bottom: 50px;

  object-fit: cover;

  border-radius: 18px;
}


/* =========================
   STORY BODY
========================= */

.story-body {
  max-width: 760px;

  margin: 0 auto;

  color: #333333;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 18px;

  line-height: 1.85;
}


.story-body :deep(p) {
  margin: 0 0 26px;
}


.story-body :deep(h2) {
  margin: 45px 0 18px;

  color: #003d7c;

  font-size: 30px;

  font-weight: 600;

  line-height: 1.3;
}


.story-body :deep(h3) {
  margin: 36px 0 16px;

  color: #003d7c;

  font-size: 24px;

  font-weight: 600;

  line-height: 1.3;
}


.story-body :deep(ul),
.story-body :deep(ol) {
  margin: 0 0 26px;

  padding-left: 28px;
}


.story-body :deep(li) {
  margin-bottom: 10px;
}


.story-body :deep(a) {
  color: #004b8d;

  text-decoration: underline;
}


.story-body :deep(a:hover) {
  color: #ef7c00;
}


/* =========================
   STORY FOOTER
========================= */

.story-footer {
  max-width: 760px;

  margin: 55px auto 0;

  padding-top: 30px;

  border-top: 1px solid #dddddd;
}


.back-button {
  display: inline-flex;

  align-items: center;

  padding: 13px 20px;

  background: #004b8d;

  color: #ffffff;

  border-radius: 8px;

  font-size: 15px;

  font-weight: 600;

  text-decoration: none;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}


.back-button:hover {
  background: #ef7c00;

  transform: translateY(-2px);
}


/* =========================
   ERROR
========================= */

.error-message {
  padding: 30px;

  background: #fff5f5;

  border-radius: 12px;

  color: #b42318;
}


.error-message h2 {
  margin: 0 0 8px;

  font-size: 22px;
}


.error-message p {
  margin: 0;
}


/* =========================
   LOADING
========================= */

.loading-message {
  color: #666666;

  font-size: 17px;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .story-page {
    padding: 24px 20px 60px;
  }


  .header {
    margin-bottom: 40px;
  }


  .nus-logo {
    width: 170px;
  }


  .back-link {
    margin-bottom: 28px;
  }


  .story h1 {
    font-size: 36px;
  }


  .story-meta {
    margin-bottom: 24px;

    font-size: 14px;
  }


  .story-intro {
    margin-bottom: 28px;

    font-size: 18px;
  }


  .featured-image {
    max-height: 360px;

    margin-bottom: 35px;
  }


  .story-body {
    font-size: 17px;

    line-height: 1.75;
  }


  .story-body :deep(p) {
    margin-bottom: 22px;
  }


  .story-footer {
    margin-top: 40px;
  }

}

</style>