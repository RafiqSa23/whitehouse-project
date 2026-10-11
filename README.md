# White House Premiere

A modern property and residential landing page built with Next.js, TypeScript, and a premium UI design for the White House Premiere brand.

🌐 Live Demo: [https://whitehouse-sand.vercel.app/](https://whitehouse-sand.vercel.app/)

## Overview

White House Premiere is a real-estate themed web application focused on presenting premium residential property information, brand positioning, and customer engagement. The project includes a modern landing page with hero section, about section, property types, contact information, and supporting personalization logic.

This repository was built using the latest Next.js app router architecture and includes support for authentication context, database integration, and scalable frontend patterns.

## Main Features

- Premium real-estate landing page design
- Responsive multi-section layout
- Property and residence showcase
- Contact and inquiry section
- Authentication and session context support
- Modern component-based UI architecture
- Database integration with Prisma + Supabase support
- Clean and scalable project structure for future expansion

## Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- React Hook Form
- Zod validation
- SweetAlert2 for user feedback
- TanStack React Query for async state management

### Backend & Data
- Prisma ORM
- Supabase client integration
- PostgreSQL-ready data layer
- JWT / Jose authentication support
- bcryptjs for password hashing

### Tools & Developer Experience
- ESLint
- TypeScript
- tsx for TypeScript execution
- Next.js built-in app router

## Project Structure

```bash
whitehouse-project/
├── app/                    # Next.js app router pages and layouts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/             # Reusable UI components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Home.tsx
│   ├── Type.tsx
│   └── navbar/
├── contexts/               # Global app contexts
│   └── AuthContexts.tsx
├── lib/                    # Utility and shared logic
├── prisma/                 # Prisma schema and seed scripts
├── public/                 # Static assets
├── styles/                 # Additional styling assets
├── .env.example            # Optional environment template (if present)
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── README.md
└── ...
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm / yarn / pnpm / bun

### Installation

```bash
git clone https://github.com/RafiqSa23/whitehouse-project.git
cd whitehouse-project
npm install
```

### Run the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
npm run start
```

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "seed": "tsx prisma/seed.ts"
}
```

## Why This Stack?

This project uses modern frontend and backend tools to ensure:

- Fast and scalable UI rendering with Next.js
- Strong typing and safety with TypeScript
- Cleaner and more maintainable styling with Tailwind CSS
- Better developer experience with modular React components
- Secure authentication flow with JWT and bcrypt-based patterns
- Database flexibility with Prisma and Supabase integration

## Deployment

This project is designed to be deployed on Vercel, which is the recommended platform for Next.js applications.

### Deployment steps

1. Push the project to GitHub
2. Connect the repository to Vercel
3. Configure environment variables if needed
4. Deploy and verify the site

## Repository Information

- Repository: `RafiqSa23/whitehouse-project`
- Default branch: `testing`
- Main language: TypeScript
- Project type: Real-estate / property website

## Author

Created by [RafiqSa23](https://github.com/RafiqSa23)

## Contributing

Pull requests and improvements are welcome. If you want to contribute to this project, feel free to fork the repository and create a pull request with your changes.

## License

This project is currently provided as a personal project without a formal license declaration unless explicitly added later.
