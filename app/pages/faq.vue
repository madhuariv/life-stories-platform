<script setup lang="ts">
const openQuestion = ref<number | null>(null)

const faqs = [
  {
    question: 'What is Life Stories?',
    answer:
      'Life Stories is a storytelling platform created to share personal experiences, reflections and moments that have made an impact on people’s lives.'
  },
  {
    question: 'Are the stories on this website real?',
    answer:
      'The stories and names used on this demo website are fictional and were created specifically for demonstration purposes.'
  },
  {
    question: 'What are Featured Stories?',
    answer:
      'Featured Stories are selected stories that are highlighted more prominently on the platform. They are managed through the content management system and can be changed without modifying the website code.'
  },
  {
    question: 'Can I share my own story?',
    answer:
      'Yes. You can use the Share Your Story form to enter your story and contact details. For this demo, submissions are not permanently stored or published.'
  },
  {
    question: 'What happens to the information I enter?',
    answer:
      'This is a demonstration form, so the information entered is not saved to a production database or published. A production version would require appropriate privacy, consent and data-handling processes.'
  }
]

const toggleQuestion = (index: number) => {
  openQuestion.value =
    openQuestion.value === index ? null : index
}
</script>

<template>
  <main class="faq-page">
<SiteHeader />


    <!-- FAQ Content -->
    <section class="faq-content">

      <NuxtLink
        to="/"
        class="back-link"
      >
        ← Back to Stories
      </NuxtLink>



      <h1>
        Frequently Asked Questions
      </h1>

      <p class="intro">
        Find answers to some common questions about
        Life Stories and how this demo platform works.
      </p>


      <!-- Questions -->
      <div class="faq-list">

        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
        >

          <button
            class="faq-question"
            type="button"
            @click="toggleQuestion(index)"
          >
            <span>
              {{ faq.question }}
            </span>

            <span class="faq-icon">
              {{ openQuestion === index ? '−' : '+' }}
            </span>
          </button>


          <div
            v-if="openQuestion === index"
            class="faq-answer"
          >
            <p>
              {{ faq.answer }}
            </p>
          </div>

        </div>

      </div>

    </section>

  </main>
</template>


<style scoped>

/* PAGE */

.faq-page {
  min-height: 100vh;

  margin: 0;

  color: #333333;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* BLUE HEADER */

.top-bar {
  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 20px 48px;

  background: #003d7c;
}


/* DEMO SITE */

.site-name {
  color: #ffffff;

  font-size: 22px;
  font-weight: 700;

  text-decoration: none;

  letter-spacing: 0.5px;
}


/* FAQ LINK */

.faq-link {
  color: #ffffff;

  font-size: 16px;
  font-weight: 600;

  text-decoration: none;
}

.faq-link:hover {
  text-decoration: underline;
}


/* CONTENT */

.faq-content {
  max-width: 900px;

  margin: 0 auto;

  padding: 55px 48px 80px;
}


/* BACK */

.back-link {
  display: inline-block;

  margin-bottom: 45px;

  color: #004b8d;

  font-size: 15px;
  font-weight: 600;

  text-decoration: none;
}

.back-link:hover {
  color: #ef7c00;
}


/* SMALL LABEL */



/* TITLE */

h1 {
  margin: 0 0 15px;

  color: #003d7c;

  font-size: 42px;
  font-weight: 600;

  line-height: 1.2;
}


/* INTRO */

.intro {
  max-width: 650px;

  margin: 0 0 40px;

  color: #555555;

  font-size: 17px;

  line-height: 1.6;
}


/* FAQ LIST */

.faq-list {
  display: flex;

  flex-direction: column;

  gap: 14px;
}


/* FAQ ITEM */

.faq-item {
  overflow: hidden;

  background: #ffffff;

  border: 1px solid #dddddd;

  border-radius: 10px;
}


/* QUESTION */

.faq-question {
  display: flex;

  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 20px 22px;

  background: #ffffff;

  color: #003d7c;

  border: none;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 17px;
  font-weight: 600;

  text-align: left;

  cursor: pointer;
}

.faq-question:hover {
  background: #f5f8fb;
}


/* PLUS / MINUS */

.faq-icon {
  margin-left: 20px;

  color: #ef7c00;

  font-size: 26px;
  font-weight: 400;
}


/* ANSWER */

.faq-answer {
  padding: 0 22px 20px;

  background: #ffffff;
}

.faq-answer p {
  margin: 0;

  color: #555555;

  font-size: 16px;

  line-height: 1.65;
}


/* MOBILE */

@media (max-width: 768px) {

  .top-bar {
    padding: 17px 20px;
  }

  .site-name {
    font-size: 19px;
  }

  .faq-content {
    padding: 40px 20px 60px;
  }

  .back-link {
    margin-bottom: 32px;
  }

  h1 {
    font-size: 34px;
  }

  .intro {
    margin-bottom: 30px;

    font-size: 16px;
  }

  .faq-question {
    padding: 18px;

    font-size: 16px;
  }

  .faq-answer {
    padding:
      0
      18px
      18px;
  }

}

</style>