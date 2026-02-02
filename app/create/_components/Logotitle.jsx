'use client'
import React from 'react'
import { Sparkles, Type } from 'lucide-react'

const Logotitle = ({ title, onHandleInputChange }) => {
    return (
        <div className='animate-in fade-in slide-in-from-right-8 duration-700'>
            <div className='flex items-start gap-5 mb-8'>
                <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20'>
                    <Type className='w-7 h-7 text-primary' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-zinc-900 mb-2'>What is your brand name?</h1>
                    <p className='text-zinc-500 leading-relaxed'>
                        This will be the main text in your logo. Keep it short and memorable for the best results.
                    </p>
                </div>
            </div>

            <div className='space-y-4'>
                <label className='text-sm font-medium text-zinc-700 ml-1'>Brand Name</label>
                <input
                    type="text"
                    placeholder='e.g. Acme Corp, Zenith, Nova...'
                    defaultValue={title}
                    className='input-pro w-full text-lg h-14'
                    onChange={(e) => onHandleInputChange(e.target.value)}
                />
                <div className='flex items-center gap-2 text-sm text-zinc-500 bg-zinc-50 p-3 rounded-lg border border-zinc-100'>
                    <Sparkles className='w-4 h-4 text-amber-500' />
                    <span><strong>Pro Tip:</strong> Shorter names (1-3 words) usually result in cleaner logo designs.</span>
                </div>
            </div>
        </div>
    )
}

export default Logotitle