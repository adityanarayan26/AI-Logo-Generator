'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import { Wand2, LayoutTemplate, PenTool, Type, Loader2, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/lib/AuthContext'
import Prompt from '../_data/Prompt'
import Link from 'next/link'
import Header from '../_components/Header'

import { useSelector } from 'react-redux'

const GenerateLogo = ({ searchParams }) => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [generatedLogo, setGeneratedLogo] = useState(null)

    // Get data from Redux Store
    const reduxFormData = useSelector((state) => state.DataForm.FormDataCollection)

    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        color: '',
        idea: '',
        style: ''
    })

    const unwrapParams = React.use(searchParams)

    useEffect(() => {
        // Priority: 1. Search Params, 2. Redux Store, 3. Defaults
        setFormData(prev => ({
            ...prev,
            title: unwrapParams?.title || reduxFormData?.title || '',
            desc: unwrapParams?.desc || reduxFormData?.description || '',
            color: unwrapParams?.color || reduxFormData?.palette || '',
            style: unwrapParams?.style || reduxFormData?.Design?.design || '',
            idea: unwrapParams?.idea || reduxFormData?.idea || ''
        }))
    }, [unwrapParams, reduxFormData])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const onGenerate = async () => {
        try {
            setLoading(true)
            const PROMPT = Prompt.LOGO_PROMPT
                .replace('{logoTitle}', formData.title)
                .replace('{logoDesc}', formData.desc)
                .replace('{logoColor}', formData.color)
                .replace('{logoIdea}', formData.idea)
                .replace('{logoStyle}', formData.style)

            const result = await axios.post('/api/auth/ai-logo-model', {
                prompt: PROMPT,
                email: user?.email,
                uid: user?.uid, // Ensure uid is passed if available
                title: formData.title,
                desc: formData.desc
            })

            const generatedImage = result.data.image;
            setGeneratedLogo(generatedImage)
            console.log("Logo Generated:", generatedImage)

            // Auto-save the logo
            if (generatedImage && user) {
                try {
                    await axios.post('/api/auth/save-logo', {
                        logoUrl: generatedImage,
                        email: user?.email,
                        uid: user?.uid,
                        title: formData.title,
                        desc: formData.desc
                    });
                    console.log("Logo saved to dashboard");
                } catch (saveError) {
                    console.error("Failed to save logo to dashboard:", saveError);
                }
            }

        } catch (error) {
            console.error("Generation failed:", error)
        } finally {
            setLoading(false)
        }
    }

    const steps = [
        { id: 'desc', icon: LayoutTemplate, label: 'Description', placeholder: 'Describe your brand briefly...' },
        { id: 'idea', icon: PenTool, label: 'Concept', placeholder: 'Any specific imagery? (e.g. geometric, eco-friendly)' },
        { id: 'style', icon: Wand2, label: 'Style', placeholder: 'e.g. Minimalist, Future-tech, Vintage' },
        { id: 'color', icon: Type, label: 'Color Palette', placeholder: 'e.g. Deep Blue, Vibrant Orange' },
    ]

    return (
        <div className='min-h-screen bg-zinc-50 flex flex-col'>

            <main className='flex-1 flex items-center justify-center p-6'>
                <div className='max-w-4xl w-full'>
                    {!generatedLogo ? (
                        <div className='grid md:grid-cols-2 gap-12 items-center'>

                            {/* Left Side: Form */}
                            <div className='space-y-8 animate-in fade-in slide-in-from-left-4 duration-700'>
                                <div>
                                    <h1 className='text-3xl font-bold text-zinc-900 mb-2'>Let's craft your brand.</h1>
                                    <p className='text-zinc-500'>Fill in the details below to generate a unique logo aligned with your vision.</p>
                                </div>

                                <div className='space-y-5'>
                                    <div className='space-y-2'>
                                        <label className='text-sm font-medium text-zinc-700 ml-1'>Brand Name</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className='input-pro w-full bg-white font-semibold text-lg'
                                            placeholder="Brand Name"
                                        />
                                    </div>

                                    {steps.map((step) => (
                                        <div key={step.id} className='space-y-2'>
                                            <label className='text-sm font-medium text-zinc-700 flex items-center gap-2 ml-1'>
                                                <step.icon className='w-4 h-4 text-zinc-400' />
                                                {step.label}
                                            </label>
                                            <input
                                                type="text"
                                                name={step.id}
                                                className='input-pro w-full'
                                                placeholder={step.placeholder}
                                                value={formData[step.id]}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={onGenerate}
                                    disabled={loading}
                                    className='w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium text-lg transition-all shadow-lg shadow-zinc-900/10 disabled:opacity-70 disabled:cursor-not-allowed'
                                >
                                    {loading ? (
                                        <span className='flex items-center gap-2'>
                                            <Loader2 className='w-5 h-5 animate-spin' />
                                            Generating Magic...
                                        </span>
                                    ) : (
                                        <span className='flex items-center gap-2'>
                                            Generate Logo <ArrowRight className='w-5 h-5' />
                                        </span>
                                    )}
                                </Button>
                            </div>

                            {/* Right Side: Preview / Placeholder */}
                            <div className='hidden md:flex flex-col items-center justify-center h-[500px] rounded-2xl bg-white border border-zinc-100 shadow-sm relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-700'>
                                <div className='absolute inset-0 bg-grid-zinc opacity-50'></div>
                                <div className='p-8 text-center relative z-10'>
                                    <div className='w-20 h-20 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-zinc-100'>
                                        <Wand2 className='w-8 h-8 text-zinc-300' />
                                    </div>
                                    <h3 className='text-lg font-medium text-zinc-900 mb-2'>AI Preview</h3>
                                    <p className='text-zinc-500 text-sm max-w-[200px]'>Your generated logo will appear here in high-resolution.</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // Result View
                        <div className='flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in-95 duration-500'>
                            <div className='relative group'>
                                <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000'></div>
                                <div className='relative bg-white p-2 rounded-2xl shadow-xl'>
                                    <Image
                                        src={generatedLogo}
                                        alt='Generated Logo'
                                        width={500}
                                        height={500}
                                        className='rounded-xl'
                                        unoptimized
                                    />
                                </div>
                            </div>

                            <div className='mt-8 flex gap-4'>
                                <Button
                                    onClick={() => setGeneratedLogo(null)}
                                    variant="outline"
                                    className='h-12 px-6 rounded-lg'
                                >
                                    Generate Another
                                </Button>
                                <Button
                                    className='h-12 px-8 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-white'
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = generatedLogo;
                                        link.download = `Prologo_${formData.title || 'Logo'}_${Date.now()}.png`;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
                                    Download Assets
                                </Button>
                            </div>

                            <Link href="/dashboard" className="fixed bottom-8 right-8 animate-in slide-in-from-bottom-5 fade-in duration-500">
                                <Button className="h-12 px-6 bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 shadow-xl rounded-full flex items-center gap-2">
                                    <LayoutTemplate className="w-4 h-4" />
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            {/* Custom Loading Overlay */}
            {loading && (
                <div className='fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center'>
                    <div className='w-24 h-24 relative mb-6'>
                        <div className="absolute inset-0 border-t-4 border-zinc-900 rounded-full animate-spin"></div>
                    </div>
                    <h2 className='text-2xl font-bold text-zinc-900 mb-2'>Crafting your logo...</h2>
                    <p className='text-zinc-500 animate-pulse'>This may take up to 30 seconds.</p>
                </div>
            )}
        </div>
    )
}

export default GenerateLogo