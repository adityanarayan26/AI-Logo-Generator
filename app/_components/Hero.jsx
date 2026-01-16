'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { Sparkles, Zap, Palette, Download, ArrowRight, Star } from 'lucide-react'

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
        { icon: Zap, text: 'AI-Powered', desc: 'State-of-the-art generation' },
        { icon: Palette, text: 'Unique Designs', desc: 'Every logo is one-of-a-kind' },
        { icon: Download, text: 'Instant Download', desc: 'Get your files immediately' },
    ]

    return (
        <div className='relative min-h-screen'>
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>

            {/* Content */}
            <div className='relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32'>
                {/* Hero Content */}
                <div className='text-center max-w-4xl mx-auto'>
                    {/* Badge */}
                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-sm font-medium text-purple-700 mb-8'>
                        <Sparkles className='w-4 h-4' />
                        <span>Powered by Advanced AI</span>
                    </div>

                    {/* Logo */}
                    <div className='mb-8'>
                        <Image
                            src='/logo.svg'
                            alt='Prologo AI'
                            width={280}
                            height={80}
                            className='mx-auto'
                            priority
                        />
                    </div>

                    {/* Headline */}
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight mb-6'>
                        Create Stunning Logos{' '}
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>
                            in Seconds
                        </span>
                    </h1>

                    <p className='text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed'>
                        Transform your brand with AI-powered logo design. No design skills needed—just pure creativity powered by cutting-edge technology.
                    </p>

                    {/* CTA Section */}
                    <div className='max-w-xl mx-auto mb-16'>
                        <div className='bg-white p-2 rounded-2xl border border-zinc-200 shadow-xl shadow-zinc-200/50'>
                            <div className='flex flex-col sm:flex-row items-center gap-3'>
                                <input
                                    type="text"
                                    placeholder='Enter your brand name...'
                                    className='flex-1 w-full bg-transparent text-lg px-5 py-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none'
                                    value={logoTitle}
                                    onChange={(e) => setlogoTitle(e.target.value)}
                                />
                                {user ? (
                                    <Link href={`/create?title=${logoTitle}`} className='w-full sm:w-auto'>
                                        <Button className='w-full sm:w-auto rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg font-semibold transition-all shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40'>
                                            Create Logo
                                            <ArrowRight className='w-5 h-5 ml-2' />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        onClick={handleGetStarted}
                                        className='w-full sm:w-auto rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg font-semibold transition-all shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40'
                                    >
                                        Get Started Free
                                        <ArrowRight className='w-5 h-5 ml-2' />
                                    </Button>
                                )}
                            </div>
                        </div>
                        <p className='text-zinc-500 text-sm mt-4'>
                            ✨ No credit card required • Generate unlimited logos
                        </p>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className='grid md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                    {features.map((feature, index) => (
                        <div key={index} className='bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow'>
                            <div className='w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4'>
                                <feature.icon className='w-6 h-6 text-purple-600' />
                            </div>
                            <h3 className='text-lg font-semibold text-zinc-900 mb-2'>{feature.text}</h3>
                            <p className='text-zinc-500 text-sm'>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hero
