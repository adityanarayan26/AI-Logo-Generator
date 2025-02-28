'use client'
import LogoDesign from '@/app/_data/LogoDesign'
import Image from 'next/image'
import React, { useState } from 'react'

const LogoStyle = ({ onHandleInputChange, formData }) => {
    const [selected, setselected] = useState('')
    return (
        <div>
            <div>
                <h1 className='text-3xl font-semibold text-primary  capitalize'>choose your Logo style</h1>
                <p className=' font-normal text-gray-500 text-lg mt-4  '>select type of logo design that best represents your brand unique identity</p>
                <div className='flex gap-5 mt-5 justify-center flex-wrap'>
                    {LogoDesign?.map((design) => (
                        <div key={design.title} className={`${selected === design.title ? 'border-primary' : formData.Design?.design === design.title && 'border-primary'}  select-none cursor-pointer border   p-8 rounded-xl hover:border-primary max-w-52 justify-center  flex items-center flex-col gap-y-2 `} onClick={() => { setselected(design.title); onHandleInputChange({ design: design.title, img: design.image ,prompt:design.prompt}) }}>
                            <Image src={design.image} alt="" width={300} height={200} className='rounded-xl object-cover  object-center shadow-xl' />
                            <h1 className='font-bold capitalize text-center'>{design.title}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LogoStyle
