'use client'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthUserDetails } from './_store/DataSlice'

const Provider2 = ({ children }) => {
  const { user } = useUser();


  const dispatch = useDispatch()
  useEffect(() => {
    user && CheckAuthUser()
  }, [user])
  const CheckAuthUser = async () => {
    try {
      const res = await axios.post('/api/auth/user', {
        fullname: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress
      })

      if (res.data) {
        dispatch(setAuthUserDetails(res.data.user))

      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div>


        <Header />
        <div className=''>

          {children}
        </div>
  
    </div>
  )
}

export default Provider2
