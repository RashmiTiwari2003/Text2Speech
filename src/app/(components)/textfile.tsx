'use client'
import React, { useEffect, useState } from 'react'
import useStore from './store'

const Textfile = () => {
    const { text, setText } = useStore();

    // useEffect(() => {
    //     console.log(text)
    // }, [text])

    return (
        <div className='flex flex-col justify-start items-start px-2 py-2 w-full h-full'>
            <div className='flex border-slate-200 mb-4 pb-4 border-b-2 w-full'>
                <div className='md:pl-2 font-serif text-sm md:text-base lg:text-xl'>Enter text below:</div>
                <button className='flex justify-center items-center bg-black hover:shadow-md ml-auto px-3 py-1 rounded-md text-sm md:text-base hover:scale-110 text-white' onClick={() => setText("")}>Clear</button>
            </div>
            <div className='flex w-full h-5/6'>
                <textarea className='flex justify-start items-start p-4 w-full h-full' name="textbox" id="textbox" value={text} placeholder='Try hey....' onChange={(e) => setText(e.target.value)}  ></textarea>
            </div>
        </div>
    )
}

export default Textfile