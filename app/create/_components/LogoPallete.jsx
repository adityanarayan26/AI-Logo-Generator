'use client'
import Colors from '@/app/_data/Colors'
import React, { useState } from 'react'
import { Palette, Check } from 'lucide-react'

const LogoPallete = ({ formData, onHandleInputChange }) => {
    const [selected, setSelected] = useState(formData?.palette || '')

    const handleSelect = (name) => {
        setSelected(name)
        onHandleInputChange(name)
    }

    return (
        <div className='animate-in fade-in slide-in-from-right-8 duration-700'>
            <div className='flex items-start gap-5 mb-8'>
                <div className='w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20'>
                    <Palette className='w-7 h-7 text-orange-600' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Choose your colors.</h1>
                    <p className='text-zinc-500 leading-relaxed'>
                        Colors evoke emotion. Select a palette that aligns with your brand's personality.
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {Colors?.map((palette, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(palette.name)}
                        className={`group relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${selected === palette.name
                                ? 'bg-purple-50 border-purple-500 ring-1 ring-purple-500'
                                : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-md'
                            }`}
                    >
                        <div className='flex gap-1.5 mb-4'>
                            {palette.colors.map((color, i) => (
                                <div
                                    key={i}
                                    className='flex-1 h-10 rounded-full shadow-sm ring-1 ring-black/5'
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className={`font-semibold transition-colors ${selected === palette.name ? 'text-purple-900' : 'text-zinc-700'}`}>
                                {palette.name}
                            </span>
                            {selected === palette.name && (
                                <div className='w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center animate-in fade-in zoom-in'>
                                    <Check className='w-3.5 h-3.5 text-white' />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LogoPallete
