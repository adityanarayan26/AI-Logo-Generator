'use client'
import Prompt from '@/app/_data/Prompt'
import axios from 'axios'
import { Lightbulb, Loader2, Sparkles, Check } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LogoIdea = ({ onHandleInputChange, formData }) => {
    const formdata = useSelector(state => state.DataForm.FormDataCollection)
    const [ideas, setIdeas] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState(formData?.idea || null)

    useEffect(() => {
        if (formdata) {
            generateLogoIdeas()
        }
    }, [formdata])

    const generateLogoIdeas = async () => {
        setLoading(true)
        try {
            const PROMPT = Prompt.DESIGN_IDEA_PROMPT
                .replace('{logoType}', formdata?.Design?.design)
                .replace('{logoTitle}', formdata?.title)
                .replace('{logoDesc}', formdata?.description)
                .replace('{logoPrompt}', formdata?.Design?.prompt)

            const result = await axios.post('/api/auth/ai-design-ideas', { prompt: PROMPT })
            setIdeas(result.data.logo_ideas || [])
        } catch (error) {
            console.error('Error generating ideas:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSelect = (idea) => {
        setSelectedItem(idea)
        onHandleInputChange(idea)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center'>
                    <Lightbulb className='w-6 h-6 text-white' />
                </div>
                <div>
                    <h1 className='text-3xl font-bold text-white'>Select Your Design Idea</h1>
                    <p className='text-gray-400'>Choose an idea or let AI pick the best one for you</p>
                </div>
            </div>

            {loading ? (
                <div className='flex flex-col items-center justify-center py-16'>
                    <div className='relative'>
                        <div className='w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse' />
                        <Loader2 className='w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin' />
                    </div>
                    <p className='text-gray-400 mt-4'>Generating creative ideas...</p>
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
                    {ideas?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(item?.idea)}
                            className={`selection-card text-center ${selectedItem === item?.idea ? 'selected' : ''}`}
                        >
                            <div className='flex items-center justify-center gap-2'>
                                <span className='text-white font-medium'>{item?.idea}</span>
                                {selectedItem === item?.idea && (
                                    <Check className='w-4 h-4 text-purple-400' />
                                )}
                            </div>
                        </div>
                    ))}

                    {/* AI Select Option */}
                    <div
                        onClick={() => handleSelect('let ai select the best idea')}
                        className={`selection-card text-center ${selectedItem === 'let ai select the best idea' ? 'selected' : ''}`}
                    >
                        <div className='flex items-center justify-center gap-2'>
                            <Sparkles className='w-5 h-5 text-purple-400' />
                            <span className='text-white font-medium'>Let AI Choose</span>
                            {selectedItem === 'let ai select the best idea' && (
                                <Check className='w-4 h-4 text-purple-400' />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LogoIdea