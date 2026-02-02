'use client'
import Prompt from '@/app/_data/Prompt'
import Loading from '@/app/_components/Loading'
import axios from 'axios'
import { Lightbulb, Sparkles, Check, Loader2, BrainCircuit } from 'lucide-react'
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
        <div className='animate-in fade-in slide-in-from-right-8 duration-700'>
            <div className='flex items-start justify-between mb-8'>
                <div className='flex items-start gap-5'>
                    <div className='w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20'>
                        <Lightbulb className='w-7 h-7 text-yellow-600' />
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Concept Selection</h1>
                        <p className='text-zinc-500 leading-relaxed'>
                            These ideas were generated based on your inputs.
                        </p>
                    </div>
                </div>

                {ideas.length > 0 && !loading && (
                    <button
                        onClick={handleAiIdeaSelection}
                        disabled={aiPicking}
                        className='hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-yellow-200 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-300 transition-all shadow-sm'
                    >
                        {aiPicking ? <Loader2 className='w-4 h-4 animate-spin' /> : <BrainCircuit className='w-4 h-4' />}
                        <span className="font-medium">{aiPicking ? 'Analyzing...' : 'AI Recommend'}</span>
                    </button>
                )}
            </div>

            {loading ? (
                <div className='min-h-[300px] flex flex-col items-center justify-center border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50'>
                    <Loader2 className='w-10 h-10 text-purple-600 animate-spin mb-4' />
                    <p className='text-zinc-500 font-medium'>Brainstorming concepts for {formData?.title}...</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {ideas?.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(item?.idea)}
                            className={`group relative p-6 rounded-xl border transition-all duration-300 cursor-pointer ${selectedItem === item?.idea
                                    ? 'bg-purple-50 border-purple-500 ring-1 ring-purple-500'
                                    : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-md'
                                }`}
                        >
                            <div className='flex items-start gap-4'>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${selectedItem === item?.idea ? 'bg-purple-600 border-purple-600' : 'bg-white border-zinc-300 group-hover:border-purple-400'}`}>
                                    {selectedItem === item?.idea && <Check className='w-3.5 h-3.5 text-white' />}
                                </div>
                                <p className={`font-medium text-lg leading-relaxed ${selectedItem === item?.idea ? 'text-purple-900' : 'text-zinc-700'}`}>
                                    {item?.idea}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LogoIdea