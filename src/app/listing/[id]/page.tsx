import React from 'react'
import { connectDB } from '../../../../config/mongodb'
import { listing } from '../../../../model/Listings'
import { ObjectId } from 'mongodb'
import { FormProp } from '@/components/Model/AirBnbMyHome'
import Image from 'next/image'
import { User } from '../../../../model/User'
import Avatar from '@/components/Avatar/Avatar'
import Map from './Map'
import Calender from './Calender'
import getCurrentUser from '@/utils/getCurrentUser'


export type User = {
  _id: string
  name: string
  email: string
  emailVerified?: string
  image?: string
  password?: string
  favourateIds?: []

}

type Props = {
  id: string

}

const getListingById = async (id: string) => {
  connectDB()
  const objectId = new ObjectId(id)
  const data = await listing.findById(objectId)
  // console.log(data)
  return data
}



export const getUserById = async (id: string | undefined): Promise<User | null> => {
  const objectId = new ObjectId(id)
  await connectDB()
  const data: User | null = await User.findById(objectId)
  return data

}

async function page({ params }: { params: Props }) {
  // console.log(params.id)
  const listings: FormProp = await getListingById(params.id)
  // console.log(listings)
  const user: User | null = await getCurrentUser()

  //how the hell is lister who listed the property

  const ListingUserInfo: User | null = await getUserById(listings?.Userid)
  // console.log(user.name)


  return (
    <>
      <main className=' flex flex-col gap-4 items-start justify-center mt-3 m-w-full mb-3'>

        <h3 className=' font-bold text-md md:text-lg '>{listings.title} , {listings.category}</h3>

        <Image
          src={listings.imageSrc}
          alt={listings.title}
          width={500}
          height={500}

          className=' w-full h-[60vh] object-contain rounded-lg '
        />
        <div className=' flex flex-col md:flex-row  justify-between w-full md:max-w-max gap-x-10'>
          <div className=' flex flex-col items-start justify-between gap-5 md:2'>

            <hr className='min-w-full md:w-[50vw]' />

            <div className=' flex flex-row items-center justify-center gap-2 '>
              <span className=' font-bold text-sm'>Hosted by : {ListingUserInfo?.name} </span>
              <Avatar />
            </div>


            <div className='font-bold text-sm' >
              {listings.guestCount} guests {listings.roomCount} rooms {listings.bathroomCount} bathrooms
            </div>

            <hr className='min-w-full md:w-[50vw]' />
            <span className=' font-bold text-sm'>
              {listings.description}
            </span>

            <hr className='min-w-full md:w-[50vw]' />

          </div>

          <Calender
            userId={user?._id}
            listing={listings}
          />
        </div>
      </main>

      <div className=' w-full md:w-[50%] min-h-max rounded-sm '>
        <Map
          latlong={listings.locationValue?.latlong}
        />
      </div>

    </>
  )
}

export default page