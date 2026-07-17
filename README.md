# My Blog

![App Preview](https://imgix.cosmicjs.com/0e42b4d0-819c-11f1-a068-3557b6b51514-autopilot-photo-1461749280684-dccba630e2f6-1784264267917.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive blog and creative portfolio built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse posts, discover authors, and explore categories — all driven dynamically by your existing Cosmic content.

## Features

- 📝 **Posts** — Rich blog posts with featured images, content, tags, author, and category
- 👤 **Authors** — Dedicated author pages with bios, avatars, and website links
- 🏷️ **Categories** — Browse and filter posts by category
- 🎨 **Modern, Responsive Design** — Clean UI built with Tailwind CSS that looks great on any device
- ⚡ **Server-Side Rendering** — Fast, SEO-friendly pages powered by Next.js App Router
- 🔗 **Deep Content Relationships** — Posts connect to authors and categories via Cosmic object metafields
- 🖼️ **Optimized Images** — Automatic image optimization using imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6a59b60f566b5bb9add0443d&clone_repository=6a59b6f484f89bed332b3d7b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
>
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — React framework with App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `posts`, `authors`, and `categories` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set your environment variables (Cosmic keys are provided automatically when deployed via Cosmic):

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with connected author + category data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)
```

## Cosmic CMS Integration

This application reads directly from your Cosmic bucket using three object types:

- **posts** — `title`, `content`, `featured_image`, `tags`, `author` (object), `category` (object)
- **authors** — `name`, `bio`, `avatar`, `website`
- **categories** — `name`, `description`

Posts use object metafields to relate to authors and categories. The app uses the `depth` parameter to fetch these connected objects in a single query. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel** — Connect your repository and add the environment variables in the project settings.
- **Netlify** — Set the build command to `bun run build` and add environment variables.

For production, set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.
<!-- README_END -->