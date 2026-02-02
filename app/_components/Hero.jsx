'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { Sparkles, Zap, Palette, Download, ArrowRight } from 'lucide-react'

const Hero = () => {
    const [logoTitle, setlogoTitle] = useState("")
    const { user, signInWithGoogle } = useAuth()

    const handleGetStarted = async () => {
        if (!user) {
            try {
                await signInWithGoogle()
            } catch (error) {
                console.error('Sign in error:', error)
            }
        }
    }

    const features = [
        { icon: Zap, text: 'AI-Powered Generation', desc: 'Create professional logos in seconds using state-of-the-art models.' },
        { icon: Palette, text: 'Unique Aesthetics', desc: 'Every design is generated uniquely for your specific brand identity.' },
        { icon: Download, text: 'Instant Export', desc: 'Download high-resolution files ready for production immediately.' },
    ]

    return (
        <div className='relative min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden bg-white'>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-zinc [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent -z-10"></div>

            <div className='relative z-10 max-w-7xl mx-auto px-6 py-20'>
                <div className='text-center max-w-3xl mx-auto'>

                    {/* Badge */}
                    <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-sm font-medium text-zinc-900 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
                        <Sparkles className='w-3.5 h-3.5 text-zinc-600' />
                        <span className="text-zinc-600">Next-Gen Logo Creation</span>
                    </div>

                    {/* Headline */}
                    <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 fill-mode-both delay-100'>
                        Design Brands <br />
                        <span className='text-gradient-primary'>Without Limits</span>
                    </h1>

                    <p className='text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both delay-200'>
                        Transform your vision into a professional brand identity.
                        No design skills required—just pure creativity powered by intelligence.
                    </p>

                    {/* CTA Section */}
                    <div className='max-w-md mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-both delay-300'>
                        <div className='flex flex-col gap-3'>
                            <div className='relative group'>
                                <input
                                    type="text"
                                    placeholder='Enter your brand name...'
                                    className='input-pro w-full pr-32 shadow-sm text-base h-14'
                                    value={logoTitle}
                                    onChange={(e) => setlogoTitle(e.target.value)}
                                />
                                <div className='absolute right-1.5 top-1.5 bottom-1.5'>
                                    {user ? (
                                        <Link href={`/create?title=${logoTitle}`} className='h-full block'>
                                            <Button className='h-full px-6 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white shadow-none transition-all'>
                                                Create
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            onClick={handleGetStarted}
                                            className='h-full px-6 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white shadow-none transition-all'
                                        >
                                            Start
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <p className='text-zinc-400 text-xs text-center'>
                                Free to try • High-resolution exports • Commercial rights
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className='grid md:grid-cols-3 gap-6 pt-10 border-t border-zinc-100 animate-in fade-in duration-1000 delay-500'>
                    {features.map((feature, index) => (
                        <div key={index} className='group p-6 rounded-xl border border-transparent hover:border-zinc-200 hover:bg-zinc-50/50 transition-all duration-300'>
                            <div className='w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center mb-4 text-zinc-900 group-hover:scale-110 transition-transform duration-300'>
                                <feature.icon className='w-5 h-5' />
                            </div>
                            <h3 className='text-base font-semibold text-zinc-900 mb-2'>{feature.text}</h3>
                            <p className='text-sm text-zinc-500 leading-relaxed'>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero
