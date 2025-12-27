'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthContext'
import Link from 'next/link'
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
        { icon: Zap, text: 'AI-Powered Generation' },
        { icon: Palette, text: 'Unique Designs' },
        { icon: Download, text: 'Instant Download' },
    ]

    return (
        <div className='relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden'>
            {/* Animated Background */}
            <div className='absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent'></div>
            <div className='absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow'></div>
            <div className='absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000'></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl'></div>

            {/* Floating Elements */}
            <div className='absolute top-32 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-float opacity-60'></div>
            <div className='absolute bottom-40 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-float animation-delay-1000 opacity-60'></div>
            <div className='absolute top-1/2 right-32 w-5 h-5 bg-blue-400 rounded-full animate-float animation-delay-500 opacity-40'></div>

            <div className='relative z-10 flex flex-col items-center gap-8 px-4 max-w-5xl mx-auto'>
                {/* Badge */}
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-purple-300 animate-slide-down'>
                    <Sparkles className='w-4 h-4' />
                    <span>Powered by Advanced AI</span>
                </div>

                {/* Main Heading */}
                <h1 className='text-5xl md:text-7xl font-extrabold text-center leading-tight'>
                    <span className='text-gradient'>AI Logo Maker</span>
                </h1>

                <h2 className='text-2xl md:text-4xl font-bold text-center text-white/90'>
                    Perfect Logos for Apps, Businesses & Websites
                </h2>

                <p className='text-lg md:text-xl text-center text-gray-400 max-w-2xl'>
                    Craft unique and professional logos with our AI-powered tool.
                    Perfect for apps, businesses, websites and more...
                </p>

                {/* Features */}
                <div className='flex flex-wrap justify-center gap-6 mt-4'>
                    {features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-2 text-gray-300'>
                            <feature.icon className='w-5 h-5 text-purple-400' />
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>

                {/* Input Section */}
                <div className='w-full max-w-2xl mt-8'>
                    <div className='glass-card p-2 rounded-2xl'>
                        <div className='flex flex-col sm:flex-row items-center gap-3'>
                            <input
                                type="text"
                                placeholder='Enter your brand name...'
                                className='input-premium flex-1 w-full sm:w-auto'
                                value={logoTitle}
                                onChange={(e) => setlogoTitle(e.target.value)}
                            />
                            {user ? (
                                <Link href={`/create?title=${logoTitle}`} className='w-full sm:w-auto'>
                                    <Button className='btn-primary w-full sm:w-auto px-8 py-6 text-lg font-semibold group'>
                                        Create Logo
                                        <ArrowRight className='w-5 h-5 ml-2 transition-transform group-hover:translate-x-1' />
                                    </Button>
                                </Link>
                            ) : (
                                <Button
                                    onClick={handleGetStarted}
                                    className='btn-primary w-full sm:w-auto px-8 py-6 text-lg font-semibold group'
                                >
                                    Get Started
                                    <ArrowRight className='w-5 h-5 ml-2 transition-transform group-hover:translate-x-1' />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Trust Badge */}
                <p className='text-gray-500 text-sm mt-6'>
                    ✨ No design skills required • Generate in seconds
                </p>
            </div>
        </div>
    )
}

export default Hero
