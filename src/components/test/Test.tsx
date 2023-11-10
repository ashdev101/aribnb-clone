import getCurrentUser from "@/utils/getCurrentUser"
import axios from "axios"
import { headers } from "next/headers"
import { cookies } from 'next/headers'

type Props = {}

const data = () => {

}


async function Test({ }: Props) {
  // const res = await fetch("http://localhost:3000/api/listing" , {
  //   method : "POST" ,
  //   headers : headers()
  // })
  const headersList = headers();
  const cookie = headersList.get('cookie');

  // const res = await axios.post("http://localhost:3000/api/listing", {}, {
  //   headers: {
  //     "Cookie": cookie
  //   }
  // })

  // console.log(res.data)

  return (
    <div>
      wow
    </div>
  )
}

export default Test