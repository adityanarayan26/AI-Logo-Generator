import React from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'
import Footer from './_components/Footer'

const page = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default page
