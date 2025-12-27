'use client'
import LogoDesign from '@/app/_data/LogoDesign'
import Image from 'next/image'
import React, { useState } from 'react'
import { Shapes, Check } from 'lucide-react'

const LogoStyle = ({ onHandleInputChange, formData }) => {
    const [selected, setSelected] = useState(formData?.Design?.design || '')

    const handleSelect = (design) => {
        setSelected(design.title)
        onHandleInputChange({
            design: design.title,
            img: design.image,
            prompt: design.prompt
        })
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center'>
                    <Shapes className='w-6 h-6 text-white' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-white'>Choose Your Style</h1>
                    <p className='text-gray-400'>Select a design style that best represents your brand</p>
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
                {LogoDesign?.map((design, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(design)}
                        className={`selection-card relative overflow-hidden ${selected === design.title ? 'selected' : ''}`}
                    >
                        <div className='relative aspect-square rounded-xl overflow-hidden mb-3'>
                            <Image
                                src={design.image}
                                alt={design.title}
                                fill
                                className='object-cover transition-transform duration-300 group-hover:scale-110'
                            />
                            {selected === design.title && (
                                <div className='absolute top-2 right-2 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center'>
                                    <Check className='w-4 h-4 text-white' />
                                </div>
                            )}
                        </div>
                        <h3 className='text-white font-semibold text-center'>{design.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LogoStyle
