'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthUserDetails } from './_store/DataSlice'

const Provider2 = ({ children }) => {
  const { user } = useAuth();
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      CheckAuthUser()
    }
  }, [user])

  const CheckAuthUser = async () => {
    try {
      const res = await axios.post('/api/auth/user', {
        uid: user?.uid,
        fullname: user?.displayName || 'User',
        email: user?.email
      })

      if (res.data) {
        dispatch(setAuthUserDetails(res.data.user))
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {children}
    </>
  )
}

export default Provider2
