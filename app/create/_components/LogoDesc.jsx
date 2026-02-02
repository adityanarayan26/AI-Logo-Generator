import React, { useState } from 'react'
import { FileText, Sparkles, Loader2, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LogoDesc = ({ formData, onHandleInputChange }) => {
    const [loading, setLoading] = useState(false);

    const handleGenerateDescription = async () => {
        if (!formData?.title) return;

        setLoading(true);
        try {
            const promptText = `Write a creative, professional brand description (max 3 sentences) for a company named '${formData.title}'. Focus on its potential industry, values, and mission. JSON format with 'description' field.`;

            // Reuse the existing endpoint but with describing prompt
            const axios = (await import('axios')).default;
            const resp = await axios.post('/api/auth/ai-logo-description', {
                prompt: promptText
            });

            if (resp.data?.description) {
                onHandleInputChange(resp.data.description);
            }
        } catch (error) {
            console.error("Error generating description:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='animate-in fade-in slide-in-from-right-8 duration-700'>
            <div className='flex items-start gap-5 mb-8'>
                <div className='w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20'>
                    <FileText className='w-7 h-7 text-blue-600' />
                </div>
                <div className='flex-1'>
                    <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Describe your vision.</h1>
                    <p className='text-zinc-500 leading-relaxed'>
                        Tell us about your industry, audience, and the vibe you're going for.
                    </p>
                </div>
            </div>

            <div className='space-y-4'>
                <div className="flex justify-between items-end">
                    <label className='text-sm font-medium text-zinc-700 ml-1'>Brand Description</label>
                    <button
                        onClick={handleGenerateDescription}
                        disabled={loading || !formData?.title}
                        className='text-xs font-semibold text-purple-600 flex items-center gap-1.5 hover:text-purple-700 disabled:opacity-50 transition-colors'
                    >
                        {loading ? <Loader2 className='w-3 h-3 animate-spin' /> : <Wand2 className='w-3 h-3' />}
                        {loading ? 'Thinking...' : 'Auto-Generate with AI'}
                    </button>
                </div>

                <textarea
                    placeholder='e.g. A modern coffee shop specializing in cold brews, targeting young professionals...'
                    value={formData?.description || ''}
                    className='input-pro w-full min-h-[160px] p-4 text-base resize-none leading-relaxed'
                    onChange={(e) => onHandleInputChange(e.target.value)}
                />

                <div className='flex items-start gap-2 text-sm text-zinc-500 bg-zinc-50 p-3 rounded-lg border border-zinc-100'>
                    <Sparkles className='w-4 h-4 text-amber-500 mt-0.5 shrink-0' />
                    <span><strong>AI Power:</strong> Being descriptive helps our model choose the right icons and fonts for you.</span>
                </div>
            </div>
        </div>
    )
}

export default LogoDesc
