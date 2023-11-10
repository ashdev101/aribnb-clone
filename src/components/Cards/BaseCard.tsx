'use client'
import React from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import Placeholder from '/public/images/placeholder.jpg'
import Image from "next/image";
import { AiOutlineHeart } from 'react-icons/ai'
import { AiFillHeart } from 'react-icons/ai'
import { FormProp } from "../Model/AirBnbMyHome";
import useSetHeart from "@/utils/useSetHeat";
import { useSession } from "next-auth/react";
import getCurrentUser from "@/utils/getCurrentUser";
import { useDispatch } from "react-redux";
import { OpenUserLoginModal } from "@/Feature/UserLoginModal/UserLoginModal";
import Link from "next/link";


type BaseCardProp = {
  listing: FormProp
  currentUserId: string | null

}

export default function BaseCard({ listing, currentUserId }: BaseCardProp) {
  // console.log(imageSrc)
  console.log(currentUserId)

  const { isHearted, toggleHeart } = useSetHeart(currentUserId, listing)
  const dispatch = useDispatch()

  // console.log(isHearted)

  return (
    <Card className="py-4 max-w-fit m-auto"
      shadow="none">

      <CardBody className="overflow-visible py-2 flex items-center relative ">
        <Image
          alt="Card background"
          className="object-cover rounded-xl hover:scale-110 transition overflow-hidden h-[200px] w-[300px]"
          src={listing.imageSrc}
          width={300}
          height={300}
        />
      </CardBody>
      <CardHeader className="pb-0 pt-2 px-4 flex flex-row justify-between">
        <div className=" flex-col items-start">

          <h4 id="name" className="font-bold text-sm">{listing.locationValue.name} , {listing.locationValue.region}</h4>
          <p id="category" className=" text-sm">{listing.category}</p>
          <p id="price" className=" text-sm">{listing.price} night</p>
          {
            isHearted
              ?
              // if userIs not loged in show him login modal

              (<div onClick={() => { toggleHeart() }}><AiFillHeart size={18} className=" absolute right-10 top-10 fill-rose-600 text-neutral-200 cursor-pointer" /></div>)
              : (<div onClick={() => { currentUserId ? toggleHeart() : dispatch(OpenUserLoginModal()) }}><AiOutlineHeart size={18} className=" absolute right-10 top-10  text-neutral-200 cursor-pointer" /></div>)
          }
        </div>

        <Button
          className=" bg-rose-300 text-white"
        >
          <Link href={`/listing/${listing._id}`}> View</Link>
        </Button>

      </CardHeader>
    </Card>
  );
}