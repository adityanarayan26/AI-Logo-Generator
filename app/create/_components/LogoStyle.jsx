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
        <div className='animate-in fade-in slide-in-from-right-8 duration-700'>
            <div className='flex items-start gap-5 mb-8'>
                <div className='w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20'>
                    <Shapes className='w-7 h-7 text-emerald-600' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Choose your aesthetic.</h1>
                    <p className='text-zinc-500 leading-relaxed'>
                        The visual style determines the feel of your logo.
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-5'>
                {LogoDesign?.map((design, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(design)}
                        className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300 ${selected === design.title
                                ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-lg shadow-purple-500/10 bg-white'
                                : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg'
                            }`}
                    >
                        <div className='aspect-square relative'>
                            <Image
                                src={design.image}
                                alt={design.title}
                                fill
                                className={`object-cover transition-transform duration-700 ${selected === design.title ? 'scale-105' : 'group-hover:scale-105'}`}
                            />
                            {/* Overlay Gradient */}
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60'></div>

                            {/* Selected Check */}
                            {selected === design.title && (
                                <div className='absolute top-3 right-3 w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center shadow-lg animate-in fade-in zoom-in'>
                                    <Check className='w-4 h-4 text-white' />
                                </div>
                            )}

                            {/* Title Label */}
                            <div className='absolute bottom-3 left-3 right-3'>
                                <span className='text-white font-semibold text-lg tracking-wide'>{design.title}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LogoStyle
