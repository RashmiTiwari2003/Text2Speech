import React from 'react'
import Audiobox from './audiobox'
import Textfile from './textfile'

const TextBox = () => {
  return (
    <div className='flex sm:flex-row flex-col justify-center items-center gap-8 md:gap-6 px-2 pt-4 pb-8 sm:pb-2 w-full h-5/6'>
      <div className='flex flex-col bg-slate-50 shadow-md px-6 py-4 rounded-xl w-80 md:w-3/6 h-80 md:h-5/6 lg:h-3/4'>
        <Textfile />
      </div>
      <div className='flex flex-col justify-center items-center bg-slate-50 shadow-md rounded-lg w-80 md:w-64 h- md:h-5/6 lg:h-3/4'>
        <div className='flex items-start border-slate-200 px-4 py-2 border-b-2 w-full'>Voice Settings</div>
        <Audiobox />
      </div>
    </div>
  )
}

export default TextBox