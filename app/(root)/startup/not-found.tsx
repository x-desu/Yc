'use client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <>
    <div className='bg-black h-screen w-screen flex items-center justify-center gap-1 text-white font-work-sans flex-col md:flex-row p-4'>
      <div className='w-screen md:max-w-lg'>
     <DotLottieReact
      src="https://lottie.host/2c4abef4-c025-4664-a10b-e556da9c8322/ZGxRbWNLqL.lottie"
      loop
      autoplay
      className=''
      />
      </div>
      <div className='flex gap-2 items-center font-thin md:border-none border-t-2 border-white rounded-sm space-y-4 md:space-y-0'>
      <p className='text-8xl  font-thin hidden md:block'>|</p>
      <div className='flex flex-col gap-2'>
      <p>This page could not be found.</p>
      <Link href="/" className='font-medium hover:underline text-center text-2xl border-t-2 border-primary/40 rounded-t-lg rounded-b-xl border-b-2 px-4 py-2 md:text-lg'>Return Home</Link>
      </div>
     
      </div>
    </div>
      </>
  )
}