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

const formatDate = (date: string) => {
  if (!date) return ''

  return new Date(date).toLocaleDateString('en-SG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/* =========================
   BONUS ANALYTICS
========================= */

let startTime = 0

const trackedScrollDepths = new Set<number>()

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

  const scrollPercentage = Math.round(
    (scrollTop / scrollableHeight) * 100
  )

  const milestones = [25, 50, 75, 100]

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

onBeforeUnmount(() => {
  window.removeEventListener(
    'scroll',
    trackScrollDepth
  )

  const secondsSpent = Math.round(
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
  <div class="story-site">

    <SiteHeader />

    <main class="story-page">

      <!-- All Stories -->
      <NuxtLink
        to="/"
        class="all-stories-link"
      >
        <span class="chevron">&lt;</span>
        <span>All Stories</span>
      </NuxtLink>

      <!-- Error -->
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

      <!-- Story -->
      <article
        v-else-if="story"
        class="story"
      >

        <p class="category">
          {{ formatCategory(story.category) }}
        </p>

        <h1>
          {{ story.title }}
        </h1>

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

        <p
          v-if="story.summary"
          class="story-intro"
        >
          {{ story.summary }}
        </p>

        <img
          v-if="story.imageUrl"
          :src="story.imageUrl"
          :alt="story.title"
          class="featured-image"
        >

        <div class="story-body">

          <PortableText
            v-if="story.body"
            :value="story.body"
          />

        </div>

      </article>

      <p
        v-else
        class="loading-message"
      >
        Loading story...
      </p>

    </main>

  </div>
</template>

<style scoped>

/* =========================
   SITE
========================= */

.story-site {
  width: 100%;
}


/* =========================
   PAGE
========================= */

.story-page {
  max-width: 1000px;

  margin: 0 auto;

  padding: 0 48px 80px;

  box-sizing: border-box;

  color: #333333;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* =========================
   ALL STORIES
========================= */

.all-stories-link {
  display: inline-flex;

  align-items: center;

  gap: 7px;

  margin: 32px 0;

  color: #004b8d;

  font-size: 16px;
  font-weight: 600;

  line-height: 1;

  text-decoration: none;

  transition: color 0.2s ease;
}

.chevron {
  display: inline-block;

  font-size: 16px;
  font-weight: 600;

  line-height: 1;
}

.all-stories-link:hover {
  color: #ef7c00;
}


/* =========================
   STORY
========================= */

.story {
  width: 100%;
}


/* =========================
   CATEGORY
========================= */

.category {
  margin: 0 0 10px;

  color: #ef7c00;

  font-size: 16px;
  font-weight: 700;

  line-height: 1.4;
}


/* =========================
   TITLE
========================= */

.story h1 {
  margin: 0 0 16px;

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

  margin-bottom: 28px;

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
  width: 100%;

  margin: 0 0 32px;

  color: #444444;

  font-size: 19px;

  line-height: 1.7;
}


/* =========================
   IMAGE
========================= */

.featured-image {
  display: block;

  width: 100%;
  max-height: 520px;

  margin: 0 0 38px;

  object-fit: cover;

  border-radius: 18px;
}


/* =========================
   STORY BODY
========================= */

.story-body {
  width: 100%;

  margin: 0;

  color: #333333;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 18px;

  line-height: 1.75;
}

.story-body :deep(p) {
  margin: 0 0 10px;
}

.story-body :deep(p:last-child) {
  margin-bottom: 0;
}

.story-body :deep(h2) {
  margin: 36px 0 15px;

  color: #003d7c;

  font-size: 28px;
  font-weight: 600;

  line-height: 1.3;
}

.story-body :deep(h3) {
  margin: 30px 0 14px;

  color: #003d7c;

  font-size: 23px;
  font-weight: 600;

  line-height: 1.3;
}

.story-body :deep(ul),
.story-body :deep(ol) {
  margin: 0 0 18px;

  padding-left: 28px;
}

.story-body :deep(li) {
  margin-bottom: 8px;
}

.story-body :deep(a) {
  color: #004b8d;

  text-decoration: underline;
}

.story-body :deep(a:hover) {
  color: #ef7c00;
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
    padding: 0 20px 60px;
  }

  .all-stories-link {
    margin: 24px 0;

    font-size: 15px;
  }

  .chevron {
    font-size: 15px;
  }

  .story h1 {
    font-size: 36px;
  }

  .story-meta {
    margin-bottom: 22px;

    font-size: 14px;
  }

  .story-intro {
    margin-bottom: 26px;

    font-size: 17px;

    line-height: 1.65;
  }

  .featured-image {
    max-height: 360px;

    margin-bottom: 30px;
  }

  .story-body {
    font-size: 17px;

    line-height: 1.7;
  }

  .story-body :deep(p) {
    margin-bottom: 10px;
  }

}

</style>