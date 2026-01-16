'use client'
import React from 'react'
import { Sparkles } from 'lucide-react'

const Logotitle = ({ title, onHandleInputChange }) => {
    return (
        <div className='space-y-6'>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
                    <Sparkles className='w-6 h-6 text-white' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-zinc-900'>What's Your Brand Name?</h1>
                    <p className='text-zinc-500'>Enter the name you want for your logo</p>
                </div>
            </div>

            <div className='mt-8'>
                <input
                    type="text"
                    placeholder='e.g. TechFlow, Quantum, Aurora...'
                    defaultValue={title}
                    className='input-premium text-xl bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-purple-500 focus:ring-purple-500/20'
                    onChange={(e) => onHandleInputChange(e.target.value)}
                />
                <p className='text-zinc-500 text-sm mt-3'>
                    💡 Tip: Keep it short, memorable, and unique
                </p>
            </div>
        </div>
    )
}

export default Logotitle