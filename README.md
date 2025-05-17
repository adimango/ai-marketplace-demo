# Secondhand Marketplace Demo (AI-Generated)

A secondhand fashion marketplace inspired by platforms like Vinted, built with Next.js.
This project was built in under 20 minutes for just **$3** using only [Claude AI](https://claude.ai) and the [Cline](https://cline.bot/).  
It was created to demonstrate the potential of **Claude** and **Cline** for rapid, low-cost web development.  
For details on how it was generated, see the [PROMPT.md](./PROMPT.md) file.

![ai-marketplace-demo screenshot](./public/images/screenshot.png)

## Live Demo

Check out the live demo: [Demo](https://ai-marketplace-demo.vercel.app/)

## Technologies Used

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Frontend**: React 18, TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: Custom React hooks, Context API
- **Development**: ESLint, TypeScript

## Features

- Responsive design that works on mobile, tablet, and desktop
- User authentication with NextAuth.js
- Product browsing with filtering and search functionality
- Product detail pages with image galleries
- User favorites/bookmarking system
- User account management
- Category-based navigation
- Clean, modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable React components
- `src/data/` - Sample product data
- `src/store/` - State management
- `src/types/` - TypeScript type definitions
- `public/` - Static assets including product images

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
