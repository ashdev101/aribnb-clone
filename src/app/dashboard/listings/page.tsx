import getCurrentUser from '@/utils/getCurrentUser'
import React from 'react'
import { listing } from '../../../../model/Listings'
import { FormProp } from '@/components/Model/AirBnbMyHome'
import BaseCard from '@/components/Cards/BaseCard'
import Link from 'next/link'

type Props = {}



async function page({ }: Props) {

    const currentUser = await getCurrentUser()
    //this wont  happen causewe are not showing the user the dashboard untill he is loged in but just for the sake of doing,,,
    if (!currentUser?._id) {
        return <div>...Kindly Login</div>
    }

    const allListings = await listing.find({ "Userid": currentUser._id })
    // console.log(allListings)

    return (
        <main className=' mt-3 grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4'>

            {allListings
                ?

                (
                    allListings.map((item: FormProp) => (
                        <>
                            <Link href={`/listing/${item._id}`} >
                                <BaseCard
                                    listing={item}
                                    currentUserId={currentUser._id}
                                />
                            </Link>
                        </>
                    ))
                )


                : <div>...Looks like you dont have any listings</div>
            }

        </main>
    )
}

export default page