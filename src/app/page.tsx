import BaseCard from "@/components/Cards/BaseCard";
import { FormProp } from '../components/Model/AirBnbMyHome'
import getCurrentUser from "@/utils/getCurrentUser";
import Link from "next/link";
import Categories from "@/components/Navbar/Categories";
import { listing } from "../../model/Listings";
import { connectDB } from "../../config/mongodb";

export default async function Home() {


  const currentUser = await getCurrentUser()
 
  // const Response = await fetch("http://localhost:3000/api/listing", { next: { tags: ['listingCollection'] } })
  // const Alllistings = await Response.json()
  await connectDB()
  const AllListings = await listing.find()
  // console.log("triggered")

  if (AllListings.length === 0) {
    return <div className=" mt-2 w-350px m-auto ">Empty try searching for other category</div>
  }
  return (
    <>
      <Categories />
      <main className=" max-w-full mt-2 grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {
          AllListings && AllListings.map((item: FormProp, index: number) => (
            
              <BaseCard
                key={index}
                listing={item}
                currentUserId={currentUser?._id}

              />
          )

          )
        }

      </main>
    </>
  )
}
