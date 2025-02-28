'use client'
import { Button } from '@/components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    const { user } = useUser()


    return (
        <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-md'>
            <Image src='/logo.svg' width={180} height={100} alt='logo' />
            {user ? <div className='flex items-center gap-x-3'><Link href={'/dashboard'}><Button>Dashboard</Button></Link> <UserButton /> </div> : <SignInButton><Button>Get Started</Button></SignInButton>}

        </div>
    )
}

export default Header