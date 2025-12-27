'use client'
import React from 'react'
import { FileText } from 'lucide-react'

const LogoDesc = ({ formData, onHandleInputChange }) => {
    return (
        <div className='space-y-6'>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center'>
                    <FileText className='w-6 h-6 text-white' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-white'>Describe Your Brand</h1>
                    <p className='text-gray-400'>Help our AI understand your vision</p>
                </div>
            </div>

            <div className='mt-8'>
                <textarea
                    placeholder='Describe your business, app, or project. What does it do? Who is it for? What feeling should the logo evoke?'
                    defaultValue={formData?.description}
                    className='input-premium min-h-[180px] resize-none text-lg'
                    onChange={(e) => onHandleInputChange(e.target.value)}
                />
                <p className='text-gray-500 text-sm mt-3'>
                    💡 Tip: Be specific about your industry, target audience, and brand personality
                </p>
            </div>
        </div>
    )
}

export default LogoDesc
