'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({ name: '', email: '', body: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('Message sent!');
        setFormData({ name: '', email: '', body: '' });
      } else {
        setStatus('Error sending message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error sending message.');
    }
  };

  return (
    <>
      {/* Contact Form */}
      <section className='text-white py-10 px-6 text-center min-h-[500px]'>
        <h2 className='font-blackops text-2xl mb-6'>Interested in a guitar or bass? Contact Us</h2>
        {!status && (
          <form onSubmit={handleSubmit} className='max-w-lg mx-auto flex flex-col gap-4'>
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
              required
              className='p-2 rounded border border-[#6a7149] bg-[#20251a] text-[#e6e3db]'
            />
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={handleChange}
              required
              className='p-2 rounded border border-[#6a7149] bg-[#20251a] text-[#e6e3db]'
            />
            <textarea
              name='body'
              placeholder='Your Message'
              rows={5}
              value={formData.body}
              onChange={handleChange}
              required
              className='p-2 rounded border border-[#6a7149] bg-[#20251a] text-[#e6e3db]'
            />
            <button
              type='submit'
              className='bg-[#a54c3c] hover:bg-[#863d30] text-white font-bold py-2 px-4 rounded transition'
            >
              Send
            </button>
          </form>
        )}
        {status && <p className='mt-4 text-4xl font-russo'>{status}</p>}
      </section>

      {/* Footer */}
      <footer className='text-center text-sm text-white bg-black bg-opacity-60 py-6'>
        <div>&copy; {currentYear} - WARBOY GUITARS</div>
        <div className='text-xs'>
          powered by{' '}
          <Link href='https://meowtin.com' className='underline' target='_blank'>
            MEOWTIN
          </Link>
        </div>
      </footer>
    </>
  );
}
