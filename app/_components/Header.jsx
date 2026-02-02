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
        <header className='glass-header sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
                <Link href="/" className='flex items-center gap-2 transition-opacity hover:opacity-80'>
                    <Image
                        src='/logo.svg'
                        width={140}
                        height={40}
                        alt='Prologo AI'
                        className='h-10 w-auto'
                    />
                </Link>

                {loading ? (
                    <div className='w-32 h-10 rounded-lg bg-zinc-100 animate-pulse'></div>
                ) : user ? (
                    <div className='flex items-center gap-4'>
                        <Link href='/create'>
                            <Button className='hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg px-5 h-10 transition-all shadow-sm gap-2'>
                                <Sparkles className='w-4 h-4' />
                                Create Logo
                            </Button>
                        </Link>
                        <Link href='/dashboard'>
                            <Button variant='ghost' className='text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 font-medium'>
                                Dashboard
                            </Button>
                        </Link>

                        <div className='relative'>
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className='flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition-all duration-200'
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt='Profile'
                                        className='w-8 h-8 rounded-full ring-2 ring-white shadow-sm'
                                    />
                                ) : (
                                    <div className='w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200'>
                                        <User className='w-4 h-4 text-zinc-500' />
                                    </div>
                                )}
                                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showDropdown && (
                                <div className='absolute right-0 mt-2 w-60 glass-panel rounded-xl overflow-hidden animate-in origin-top-right'>
                                    <div className='p-4 border-b border-zinc-100 bg-zinc-50/50'>
                                        <p className='text-zinc-900 font-medium truncate text-sm'>{user.displayName}</p>
                                        <p className='text-zinc-500 text-xs truncate'>{user.email}</p>
                                    </div>
                                    <div className='p-1'>
                                        <button
                                            onClick={handleSignOut}
                                            className='w-full px-3 py-2 flex items-center gap-2.5 text-sm text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                        >
                                            <LogOut className='w-4 h-4' />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <Button
                        onClick={handleSignIn}
                        className='bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-lg px-6 h-10 transition-all shadow-sm hover:shadow-md'
                    >
                        Get Started
                    </Button>
                )}
            </div>
        </header>
    )
}

export default Header