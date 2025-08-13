import './globals.css';

export const metadata = {
  title: 'WARBOY GUITARS',
  description: 'Website coming soon!',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-[#0f1113] text-[#e6e3db] antialiased'>
        <div className="pointer-events-none fixed inset-0 bg-[url('/noise.png')] opacity-[0.06] mix-blend-soft-light" />
        {children}
      </body>
    </html>
  );
}
