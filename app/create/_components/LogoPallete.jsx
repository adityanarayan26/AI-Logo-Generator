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
        <div className='space-y-6'>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center'>
                    <Palette className='w-6 h-6 text-white' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-white'>Choose Your Colors</h1>
                    <p className='text-gray-400'>Select a color palette that represents your brand</p>
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
                {Colors?.map((palette, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(palette.name)}
                        className={`palette-card ${selected === palette.name ? 'selected' : ''}`}
                    >
                        <div className='flex gap-1 mb-3'>
                            {palette.colors.map((color, i) => (
                                <div
                                    key={i}
                                    className='flex-1 h-12 rounded-lg first:rounded-l-xl last:rounded-r-xl transition-transform hover:scale-105'
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                        <div className='flex items-center justify-between'>
                            <span className='text-white font-medium'>{palette.name}</span>
                            {selected === palette.name && (
                                <div className='w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center'>
                                    <Check className='w-3 h-3 text-white' />
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
