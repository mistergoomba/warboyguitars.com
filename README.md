# WARBOY GUITARS

> **Handcrafted for Battle** — A showcase of custom guitars forged in fire and built for stage warfare.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.18.1-pink)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black)](https://vercel.com/)

## 🎸 Overview

WARBOY GUITARS is a modern, responsive website showcasing custom handcrafted guitars. Built with Next.js 15 and featuring smooth animations, the site presents five unique guitar models: WARPIG, SPECTER, CLAWTOOTH, ARCWIND, and THUNDERPIG.

### Key Features

- **Interactive Guitar Gallery** - High-resolution image galleries with zoom functionality
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Powered by Framer Motion for engaging user experience
- **Contact Form** - Integrated contact system using Resend API
- **SEO Optimized** - Complete meta tags, Open Graph, and Twitter Card support
- **Performance Focused** - Optimized images and modern web standards

## 🚀 Live Site

Visit the live site: **[warboyguitars.com](https://warboyguitars.com)**

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Frontend**: React 19.0.0
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.18.1
- **Email**: Resend API
- **Fonts**: Google Fonts (Black Ops One, Russo One)
- **Deployment**: Vercel
- **Image Optimization**: Next.js Image component

## 📁 Project Structure

```
warboyguitars.com/
├── app/
│   ├── api/contact/          # Contact form API endpoint
│   ├── components/           # Reusable React components
│   │   ├── Footer.js
│   │   ├── Gallery.js
│   │   ├── GuitarList.js
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── HomePage.js
│   │   ├── Intro.js
│   │   └── ZoomOverlay.js
│   ├── guitar/
│   │   ├── [slug]/          # Dynamic guitar pages
│   │   └── components/       # Guitar-specific components
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.js            # Root layout with metadata
│   └── page.js              # Homepage
├── public/
│   ├── guitars/             # Guitar images and galleries
│   │   ├── arcwind/
│   │   ├── clawtooth/
│   │   ├── specter/
│   │   ├── thunderpig/
│   │   └── warpig/
│   └── logo/                # Brand assets
└── out/                     # Static export output
```

## 🎯 Guitar Models

### WARPIG

- Mahogany body with maple neck
- 24.5" scale length, 22 jumbo frets
- Custom pickups (16.5k bridge, 7.5k neck)
- Locking roller bridge

### SPECTER

- Double cutaway mahogany body
- Pearl trapezoid inlays
- 12" fretboard radius
- Medium jumbo frets

### CLAWTOOTH

- Mahogany body and neck
- Carve top design
- Short scale length
- String-through body construction

### ARCWIND

- Basswood body with maple neck
- Floyd Rose double-locking tremolo
- 10" fretboard radius
- 24.5" scale length

### THUNDERPIG

- Bass guitar model
- Custom design and construction
- Featured customer testimonial

## 🎨 Customization

### Adding New Guitars

1. Add guitar data to `app/guitar/data.js`
2. Create image folders in `public/guitars/[guitar-name]/`
3. Add hero images and gallery images
4. Update the `ALL` array in `data.js`

### Styling

The project uses Tailwind CSS 4.0 with custom utilities:

- `.bg-camo` - Camouflage background pattern
- `.font-blackops` - Black Ops One font family
- `.font-russo` - Russo One font family

### Contact Form

The contact form uses Resend API. Configure your API key in environment variables and update the recipient emails in `app/api/contact/route.js`.

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind's responsive breakpoints
- **Images**: Responsive images with multiple sizes
- **Touch Friendly**: Optimized for touch interactions

## 🚀 Deployment

### Manual Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Export static files (if needed):
   Uncomment `output: 'export'` in `next.config.mjs`

3. Deploy the `out` folder to your hosting provider

## 🔧 Configuration

### Next.js Configuration

The project uses a minimal Next.js configuration in `next.config.mjs`. Static export is commented out but available for static hosting.

### Image Optimization

All images are optimized using Next.js Image component with:

- WebP format for better compression
- Multiple sizes for responsive loading
- Lazy loading for performance

## 📊 Performance

- **Core Web Vitals**: Optimized for Google's Core Web Vitals
- **Image Optimization**: Automatic WebP conversion and sizing
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Images and components load on demand

## 📄 License

This project is private and proprietary. All rights reserved.

## 📞 Contact

- **Website**: [warboyguitars.com](https://warboyguitars.com)
- **Email**: contact@warboyguitars.com

---

**WARBOY GUITARS** — _Forged in fire, built for stage warfare._
