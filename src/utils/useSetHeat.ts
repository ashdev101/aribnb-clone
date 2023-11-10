'use client'

import { FormProp } from '@/components/Model/AirBnbMyHome'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

// type Props = {
//   listings: FormProp
//   currentUserId: string
// }

function useSetHeart(currentUserId: string | null, listings: FormProp) {
  const [isHearted, setIsHearted] = useState(currentUserId ? listings.heartlist?.includes(currentUserId) : null)
  
  const router = useRouter()
  // console.log(listings._id)

  const addHeartMutation = useMutation({
    mutationFn: async () => {
      return await axios.post('http://localhost:3000/api/heart', { id: listings._id });
    },
    onSuccess: () => {
      setIsHearted(true)

      //which ever component uses this useSetHeart hook will essentially reload to have the fresh data // or we can do query from the REACT-qUERY AND invalidate the data which keep data fresh
      router.refresh()
    }
  })

  const removeHeartMutation = useMutation({
    mutationFn: async () => {
      return await axios.put('http://localhost:3000/api/heart', { id: listings._id })
    },
    onSuccess: () => {
      setIsHearted(false)
      router.refresh()
      
    }
  })




  const toggleHeart = async () => {
    if (!isHearted) {
      addHeartMutation.mutate()
    } else {
      removeHeartMutation.mutate()
    }
  }


  return { isHearted, toggleHeart }


}
export default useSetHeart