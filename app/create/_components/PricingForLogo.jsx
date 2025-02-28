"use client"; // ✅ Mark this as a Client Component

import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const pricingOption = [
  {
    title: 'Free',
    icon: '/free.png',
    features: [
      '⚫ Generate unlimited logos for free',
      '⚫ Longer wait times',
      '⚫ Wait time: 30 seconds to 3 minutes',
      '⚫ Limited Design Options and Quality',
      '⚫ Slow (Not Recommended)',
    ],
    button: 'Generate Free',
  }
];

export const PricingForLogo = () => {
  const { user } = useUser(); // ✅ Ensure `useUser()` is used inside a Client Component

  return (
    <div className='flex flex-col gap-y-5 justify-center'>
      <h1 className='text-3xl font-bold text-primary capitalize'>Select AI Model Plan</h1>
      <div className='flex gap-5 justify-center flex-wrap'>
        {pricingOption.map((item, id) => (
          <div
            key={id}
            className='rounded-xl p-5 cursor-pointer hover:border-primary transition-all ease-linear duration-150 hover:shadow-lg flex flex-col justify-between py-5 border'
          >
            <div className='flex justify-center'>
              <Image src={item.icon} alt={item.title} width={300} height={100} className='size-20 object-cover object-center' />
            </div>
            <h2 className='text-center my-5 font-bold capitalize text-xl'>{item.title}</h2>

            {item.features.map((feature, featureIndex) => (
              <h2 key={featureIndex} className='font-medium text-lg'>{feature}</h2>
            ))}

            {user ? (
              <Link href={`generate-logo?type=${item.title}`}><Button className='mt-5'>{item.button}</Button></Link>
            ) : (
              <SignInButton mode='modal' forceRedirectUrl={`generate-logo?type=${item.title}`}>
                <Button className='mt-5'>{item.button}</Button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
