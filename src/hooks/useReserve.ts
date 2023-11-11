'use client'


import { FormProp } from "@/components/Model/AirBnbMyHome"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { eachDayOfInterval } from "date-fns"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


function useReservation(
  userId: string | undefined,
  listing: FormProp,
  startDate: Date | undefined,
  endDate: Date | undefined,
  price: number
) {


  const body = {
    listingid: listing?._id,
    Userid: userId,
    startDate: startDate,
    endDate: endDate,
    totalPrice: price
  }

  const queryClient = useQueryClient()
  const [reservations, setReservations] = useState<Array<any>>([])

  // **** process => dataisFetchedfromtheserver => setReservationtoshowthebookedstateincalender =>ifNewReservation =>Mutate & invalidateTag => dataisFetchedAgainAutomaticallyinREACTqUERY => USEeFFECT => UPDATEDsTATED 



  //QUERIES AMD MUTATIONS 

  const allreservationsOfListing = useQuery({
    queryKey: ['allreservationsOfListing'],
    queryFn: async () => {
      const res = (await axios(`${process.env.NEXT_PUBLIC_URL}/reservation?list_id=${listing._id}`))
      // console.log(res)
      return res.data
    },

  })

  const makeReservationMutation = useMutation({
    mutationFn: async () => {
      return await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/reservation`, body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allreservationsOfListing'] })
      toast.success("Reservation  succesfull")
    }

  })


  // there is a breaking chamge in the useQuery and hece i am using the useEffect but laterly i will find the solution

  //REVALIDATE THE RESERVED STATE ON CHANGE OF DATA

  useEffect(() => {
    const array: any = []
    allreservationsOfListing.data?.map((item: any) => {
      const result = eachDayOfInterval({
        start: new Date(item.startDate),
        end: new Date(item.endDate)
      })

      array.push(result)
      // console.log(array)
    })
    const formatedArray = array.flat()
    setReservations(formatedArray)


  }, [allreservationsOfListing.data])




  // console.log(reservations)



  const makeReservation = () => {
    if (userId) {
      makeReservationMutation.mutate()
    }

  }



  return { reservations, makeReservation, isloading: makeReservationMutation.isPending }

}

export default useReservation