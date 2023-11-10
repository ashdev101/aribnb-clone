
import getListingsByCondition from '@/actions/getListingsByCondition'
import BaseCard from '@/components/Cards/BaseCard'
import { FormProp } from '@/components/Model/AirBnbMyHome'
import getCurrentUser from '@/utils/getCurrentUser'
import React from 'react'

type searchParamsTypes = {
  startDate: string
  endDate?: string
  locationValue?: string
  bathroomCount?: string
  roomCount?: string
  guestCount?: string
}



// every page.js receives searchparams and params bydefault 

async function page({searchParams}) {
  // console.log(searchParams)
  const { finalResult , reservationQuery , listingQuery} = await getListingsByCondition({ ...searchParams })

  // console.log(listingQuery)
  // console.log(reservationQuery)
  const currentUser = await getCurrentUser()
  // console.log(listingQuery)
  // console.log("hii")
  if (finalResult.length ===0) {

    return <>....No Matching Results found try modifying you query </>
  }
  return (
    <main className=' mt-3 grid gap-8 grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
      {

        finalResult
        && finalResult.map((item: FormProp) =>
        (

            <BaseCard
              key={item.title}
              listing={item}
              currentUserId={currentUser?._id}
            />
          
        )
        )

      }
    </main>
  )
}

export default page