'use client'
import Prompt from '@/app/_data/Prompt'
import Loading from '@/app/_components/Loading'
import axios from 'axios'
import { Lightbulb, Sparkles, Check, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LogoIdea = ({ onHandleInputChange, formData }) => {
    // Rely on passed formData prop instead of Redux for immediate updates
    const [ideas, setIdeas] = useState([])
    const [loading, setLoading] = useState(false)
    const [aiPicking, setAiPicking] = useState(false)
    const [selectedItem, setSelectedItem] = useState(formData?.idea || null)

    const hasFetched = React.useRef(false)

    useEffect(() => {
        if (formData?.title && ideas.length === 0 && !hasFetched.current) {
            hasFetched.current = true
            generateLogoIdeas()
        }
    }, [formData?.title])

    const generateLogoIdeas = async () => {
        setLoading(true)
        try {
            const PROMPT = Prompt.DESIGN_IDEA_PROMPT
                .replace('{logoType}', formData?.Design?.design)
                .replace('{logoTitle}', formData?.title)
                .replace('{logoDesc}', formData?.description)
                .replace('{logoPrompt}', formData?.Design?.prompt)

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

    const handleAiIdeaSelection = async () => {
        if (ideas.length === 0) return;
        setAiPicking(true);

        try {
            const ideaList = ideas.map(i => i.idea);
            const prompt = `Given Brand Name: '${formData?.title}', Description: '${formData?.description || ''}', select the single best logo idea from this list: ${JSON.stringify(ideaList)}. Return JSON with 'idea' field containing the exact idea text from the list.`;

            const resp = await axios.post('/api/auth/ai-idea-picker', {
                prompt: prompt
            });

            const suggestedIdea = resp.data?.idea;
            if (suggestedIdea) {
                // Find exact match in ideas list
                const matchedIdea = ideas.find(i => i.idea === suggestedIdea);
                if (matchedIdea) {
                    handleSelect(matchedIdea.idea);
                } else if (ideaList.includes(suggestedIdea)) {
                    handleSelect(suggestedIdea);
                }
            }
        } catch (error) {
            console.error("AI Idea Picker Error:", error);
        } finally {
            setAiPicking(false);
        }
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center'>
                        <Lightbulb className='w-6 h-6 text-white' />
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-zinc-900'>Select Your Design Idea</h1>
                        <p className='text-zinc-500'>Choose an idea or let AI pick the best one for you</p>
                    </div>
                </div>

                {ideas.length > 0 && (
                    <button
                        onClick={handleAiIdeaSelection}
                        disabled={aiPicking}
                        className='flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700 hover:bg-yellow-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {aiPicking ? <Loader2 className='w-4 h-4 animate-spin' /> : <Sparkles className='w-4 h-4' />}
                        {aiPicking ? 'Picking Best Idea...' : 'Let AI Pick'}
                    </button>
                )}
            </div>

            {loading ? (
                <div className='min-h-[300px] flex items-center justify-center'>
                    <Loading fullScreen={false} message="Generating creative ideas..." />
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-8'>
                    {ideas?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(item?.idea)}
                            className={`selection-card text-center relative overflow-hidden bg-white border border-zinc-200 p-6 rounded-xl cursor-pointer hover:shadow-md transition-all ${selectedItem === item?.idea ? 'ring-2 ring-purple-500 border-purple-500 bg-purple-50' : 'hover:border-zinc-300'}`}
                        >
                            <div className='flex items-center justify-center gap-2'>
                                <span className='text-zinc-700 font-medium'>{item?.idea}</span>
                                {selectedItem === item?.idea && (
                                    <Check className='w-4 h-4 text-purple-600' />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LogoIdea