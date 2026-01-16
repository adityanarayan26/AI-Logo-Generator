import React, { useState } from 'react'
import { FileText, Sparkles, Loader2 } from 'lucide-react'

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
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center'>
                        <FileText className='w-6 h-6 text-white' />
                    </div>
                    <div>
                        <h1 className='text-3xl font-bold text-zinc-900'>Describe Your Brand</h1>
                        <p className='text-zinc-500'>Help our AI understand your vision</p>
                    </div>
                </div>

                <button
                    onClick={handleGenerateDescription}
                    disabled={loading || !formData?.title}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Sparkles className='w-4 h-4' />}
                    {loading ? 'Generating...' : 'Auto-Generate'}
                </button>
            </div>

            <div className='mt-8'>
                <textarea
                    placeholder='Describe your business, app, or project. What does it do? Who is it for? What feeling should the logo evoke?'
                    value={formData?.description || ''}
                    className='input-premium min-h-[180px] resize-none text-lg bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-purple-500 focus:ring-purple-500/20'
                    onChange={(e) => onHandleInputChange(e.target.value)}
                />
                <p className='text-zinc-500 text-sm mt-3'>
                    💡 Tip: Be specific about your industry, target audience, and brand personality
                </p>
            </div>
        </div>
    )
}

export default LogoDesc
