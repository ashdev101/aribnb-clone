import getCurrentUser from '@/utils/getCurrentUser'
import React from 'react'
import { listing } from '../../../../model/Listings'
import { FormProp } from '@/components/Model/AirBnbMyHome'
import BaseCard from '@/components/Cards/BaseCard'

type Props = {}

const getListingsByUserHeart = async(userId : string)=>{
  const data = await listing.find({"heartlist" :userId })
  return data
}

async function page({}: Props) {

  const currentUser = await getCurrentUser()
  //again this wont happen but just for the sake of conformation and doing things 
  if(!currentUser?._id){
    return <div>.....Kindly Login</div>
  }



  const data = await getListingsByUserHeart(currentUser._id)
  // console.log(data)


  // const myfavourate

  return (
    <main className=' mt-2 grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {data 
      ?
        data.map((item:FormProp)=>(

          <>
            <BaseCard
            listing={item}
            currentUserId={currentUser._id}
            />
          </>
        ))

        : <>Looks like you dont have any favortites ....</>
      }

    </main>
  )
}

export default page