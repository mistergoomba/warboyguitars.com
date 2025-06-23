import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='text-center text-sm text-white bg-black bg-opacity-60 py-6'>
      <div>&copy; {currentYear} - WARBOY GUITARS</div>
      <div className='text-xs'>
        powered by{' '}
        <Link href='https://meowtin.com' className='underline' target='_blank'>
          MEOWTIN
        </Link>
      </div>
    </footer>
  );
}
