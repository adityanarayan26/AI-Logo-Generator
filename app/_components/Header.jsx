'use client'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { LogOut, User, ChevronDown, Sparkles } from 'lucide-react'

const Header = () => {
    const { user, signInWithGoogle, signOut, loading } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)

    const handleSignIn = async () => {
        try {
            await signInWithGoogle()
        } catch (error) {
            console.error('Sign in error:', error)
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut()
            setShowDropdown(false)
        } catch (error) {
            console.error('Sign out error:', error)
        }
    }

    return (
        <header className='header-glass sticky top-0 z-50'>
            <div className='px-6 lg:px-16 xl:px-24 2xl:px-32 py-4 flex justify-between items-center'>
                <Link href="/" className='flex items-center gap-2 group'>
                    <div className='relative'>
                        <Image src='/logo.svg' width={160} height={80} alt='AI Logo Maker' className='transition-transform duration-300 group-hover:scale-105' />
                    </div>
                </Link>

                {loading ? (
                    <div className='w-32 h-10 rounded-lg shimmer'></div>
                ) : user ? (
                    <div className='flex items-center gap-4'>
                        <Link href='/create'>
                            <Button className='btn-primary flex items-center gap-2'>
                                <Sparkles className='w-4 h-4' />
                                Create Logo
                            </Button>
                        </Link>
                        <Link href='/dashboard'>
                            <Button variant='ghost' className='text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'>
                                Dashboard
                            </Button>
                        </Link>

                        <div className='relative'>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className='flex items-center gap-2 p-2 rounded-xl hover:bg-zinc-100 transition-all duration-200'
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt='Profile'
                                        className='w-9 h-9 rounded-full ring-2 ring-purple-500/50'
                                    />
                                ) : (
                                    <div className='w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
                                        <User className='w-5 h-5 text-white' />
                                    </div>
                                )}
                                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showDropdown && (
                                <div className='absolute right-0 mt-2 w-56 glass-card rounded-xl overflow-hidden animate-slide-down'>
                                    <div className='p-4 border-b border-zinc-200'>
                                        <p className='text-zinc-900 font-medium truncate'>{user.displayName}</p>
                                        <p className='text-zinc-500 text-sm truncate'>{user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        className='w-full px-4 py-3 flex items-center gap-3 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors'
                                    >
                                        <LogOut className='w-4 h-4' />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <Button onClick={handleSignIn} className='btn-primary'>
                        Get Started
                    </Button>
                )}
            </div>
        </header>
    )
}

export default Header