import React from 'react'
import Image from 'next/image'
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ["600"],
});

const Navbar = () => {
  return (
    <div className='flex justify-center items-center lg:mt-3 px-8 py-4 w-full'>
        <Image src="/image/sound.png" alt="logo" width={50} height={50} />
        <div className={`flex items-center mx-4 ${fredoka.className} text-2xl sm:text-3xl md:text-4xl font-black`}>text-2-speech</div>
    </div>
  )
}

export default Navbar