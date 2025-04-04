export default function Home() {
  return (
    <div className='min-h-[100dvh] flex flex-col justify-between items-center bg-camo bg-cover text-white text-center px-4 py-8'>
      <div className='flex-grow flex items-center justify-center w-full'>
        <img
          src='/logo.png'
          alt='War Boy Logo'
          className='w-[85%] max-w-[675px] h-auto object-contain'
        />
      </div>
      <h1 className='text-white font-bold tracking-wide mt-6 w-[85%] text-3xl sm:text-4xl text-center'>
        Coming Soon
      </h1>
    </div>
  );
}
