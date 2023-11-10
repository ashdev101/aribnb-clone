'use client'

import { OpenUserLoginModal } from '@/Feature/UserLoginModal/UserLoginModal';
import { FormProp } from '@/components/Model/AirBnbMyHome';
import useReservation from '@/hooks/useReserve';
import { Button } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { differenceInCalendarDays } from 'date-fns';
import { useSession } from 'next-auth/react';
import { MouseEvent, useEffect, useState } from 'react'
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useDispatch } from 'react-redux';
import { getUserById } from './page';

type Props = {
  userId: string | undefined
  listing: FormProp

}

function Calender({ userId, listing }: Props) {
  // const { data: session } = useSession()
  // console.log(session?.user?.email)

  // const lister_User_Name = useQuery({
  //   queryKey : ["Listerusername"] ,
  //   queryFn : async ()=>{
  //     return await getUserById(listing.Userid)
  //   }

  // }) 
  const dispatch = useDispatch()
  const [price, setPrice] = useState<number>(0)
  const [dateRange, setdateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'

    }
  ]);
  useEffect(() => {
    const Calculateprice = () => {

      if (dateRange[0]?.endDate && dateRange[0].startDate) {
        const dayDifference = differenceInCalendarDays(dateRange[0].endDate, dateRange[0].startDate)
        // console.log(dayDifference)
        setPrice(Number(listing?.price) * Number(dayDifference))
      }
    }

    Calculateprice()
  }, [dateRange])


  const { reservations, makeReservation, isloading } = useReservation(userId, listing, dateRange[0].startDate, dateRange[0].endDate, price)
  // console.log(reservations)
  // console.log(price)
  // console.log(dateRange)
  // console.log(userId)

  const handleReservationClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if (!userId) {
      dispatch(OpenUserLoginModal())
      return
    }
    makeReservation()
  }
  return (
    <main className=' p-2 border-[1px] border-neutral-300 shadow-sm rounded-md flex flex-col items-start justify-center max-w-max'>

      <div className=' w-full p-3 bg-rose-700 text-white rounded-md font-bold text-sm'>
        Per Nigh : {listing.price}
      </div>

      <DateRange
        editableDateInputs={true}
        onChange={item => setdateRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        minDate={new Date()}
        disabledDates={reservations}


      />

      <div className=' w-full p-3 bg-rose-500 text-white rounded-md mb-3 font-bold text-sm'>
        Total Price : {price}
      </div>
      <Button
        fullWidth
        className=' bg-rose-400 text-white'
        // if user not exists redirect him to login and 
        disabled={isloading}
        onClick={handleReservationClick}
        isLoading={isloading}
      >
        Reserve
      </Button>
    </main>
  )

}

export default Calender