// layout.js
import './globals.css';
import { Black_Ops_One, Russo_One, Montserrat } from 'next/font/google';

const blackops = Black_Ops_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-blackops',
});

const russo = Russo_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-russo',
});

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

// Resolve a base URL for metadata in every environment
const appBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata = {
  metadataBase: new URL(appBaseUrl),

  title: 'WARBOY GUITARS | Handcrafted for Battle',
  description:
    'WARBOY GUITARS — forged in fire, built for stage warfare. Explore unique handcrafted guitars like WARPIG, SPECTER, CLAWTOOTH, and ARCWIND.',
  openGraph: {
    title: 'WARBOY GUITARS | Handcrafted for Battle',
    description:
      'Custom guitars born from chaos — WARPIG, SPECTER, CLAWTOOTH, ARCWIND. Designed to dominate the stage.',
    url: '/',
    siteName: 'WARBOY GUITARS',
    images: [
      {
        url: '/share-image.webp',
        width: 1200,
        height: 630,
        alt: 'WARBOY GUITARS Share Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WARBOY GUITARS | Handcrafted for Battle',
    description: 'Custom guitars born from chaos — WARPIG, SPECTER, CLAWTOOTH, ARCWIND.',
    images: ['/share-image.webp'],
    creator: '@warboyguitars',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${blackops.variable} ${russo.variable} ${montserrat.variable}`}>
      <body className='text-[#e6e3db] antialiased'>
        <div className='pointer-events-none fixed inset-0 opacity-[0.06] mix-blend-soft-light' />
        {children}
      </body>
    </html>
  );
}
