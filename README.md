# Life Stories Platform

A responsive storytelling website built with **Nuxt, Vue, TypeScript, and Sanity CMS**.

Stories are managed through Sanity and displayed dynamically on the website. Editors can also mark selected stories as featured without changing the frontend code.

## Live Demo

https://main.d3u3gr1lh92bwk.amplifyapp.com

## Features

- CMS-managed stories using Sanity
- Featured story highlighting
- Dynamic story pages
- Responsive desktop and mobile design
- Share Your Story form
- FAQ page
- First-party story analytics
- AWS Amplify deployment

## Tech Stack

**Nuxt 4 · Vue 3 · TypeScript · Sanity CMS · GROQ · Portable Text · AWS Amplify**

## Run Locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:3000`

To create a production build:

```bash
npm run build
```

Sanity Studio is maintained separately and runs on `http://localhost:3333`.

## Notes

The stories and names are fictional demo content created for this assessment, and demonstration images were sourced from Unsplash.

The Share Your Story form is a prototype and does not permanently store submissions. Bonus analytics track story views, scroll depth, and reading time in the browser console. Analytics are not stored or sent to an external service. In a production version, I would minimise the data collected and apply appropriate privacy, consent, access-control, and data-retention measures.