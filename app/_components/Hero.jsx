'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'

const Hero = () => {
    const [logoTitle, setlogoTitle] = useState("")
    return (
        <div className='flex flex-col items-center mt-32 gap-5'>
            <h1 className='uppercase text-5xl text-primary text-center font-extrabold'>Ai logomaker app</h1>
            <h1 className=' text-4xl text-black capitalize text-center font-bold'>Perfect logos for app,businesses,websites </h1>
            <h1 className='capitalize text-lg text-center font-medium'>craft unique and professional logos with our ai powered tool. perfect for apps,businesses ,websites and more...</h1>
            <div className='flex items-center gap-x-5 w-full max-w-2xl'>
                <input type="text" placeholder='enter your logo name' className='capitalize w-full shadow-lg border-[1px] border-zinc-300 pl-2 py-3 rounded-lg outline-none' onChange={(e) => setlogoTitle(e.target.value)} />
                <Link href={`create?title=${logoTitle}`}><Button className='shadow text-base text-white capitalize w-full  p-6 font-semibold hover:text-white hover:bg-rose-600 bg-rose-600'>Get Started</Button></Link>
            </div>
        </div>
    )
}

export default Hero
