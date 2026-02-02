import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='border-t border-zinc-100 bg-white'>
            <div className='max-w-7xl mx-auto px-6 py-12 md:py-16'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8'>
                    <div className='col-span-1 md:col-span-2 space-y-4'>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold bg-zinc-900 text-white w-8 h-8 flex items-center justify-center rounded-lg">P</span>
                            <span className="text-xl font-bold text-zinc-900">Prologo AI</span>
                        </div>
                        <p className='text-zinc-500 text-sm leading-relaxed max-w-sm'>
                            Empowering brands with intelligent design. Create professional, unique logos in seconds with our advanced AI technology.
                        </p>
                    </div>

                    <div>
                        <h4 className='font-semibold text-zinc-900 mb-4'>Product</h4>
                        <ul className='space-y-3 text-sm text-zinc-500'>
                            <li><Link href='/create' className='hover:text-zinc-900 transition-colors'>Create Logo</Link></li>
                            <li><Link href='/dashboard' className='hover:text-zinc-900 transition-colors'>Dashboard</Link></li>
                            <li><Link href='#' className='hover:text-zinc-900 transition-colors'>Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='font-semibold text-zinc-900 mb-4'>Company</h4>
                        <ul className='space-y-3 text-sm text-zinc-500'>
                            <li><Link href='#' className='hover:text-zinc-900 transition-colors'>About</Link></li>
                            <li><Link href='#' className='hover:text-zinc-900 transition-colors'>Terms</Link></li>
                            <li><Link href='#' className='hover:text-zinc-900 transition-colors'>Privacy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-zinc-100 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-zinc-400'>
                    <p>&copy; {new Date().getFullYear()} Prologo AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
