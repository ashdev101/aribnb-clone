"use client"

import React, { useMemo, useState } from 'react'
import { category } from '../Navbar/Categories'
import Image from 'next/image'
import { Button, Input, useDisclosure } from '@nextui-org/react'
import BaseModalForForm from './BaseModalForForm'
import SelectComponent from './Select'
import dynamic from 'next/dynamic'
import { CountryObjectType } from '@/hooks/useCountry'
import Counter from './Counter'
import UploadImg from '../ImageUploadCloudFlare/ImageUploadCloudFlare'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/Feature/Store/Store'
import { CloseAirBnbMyHomeModal } from '@/Feature/AirBnbMyHome/AirbnbMyHomeSlice'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { OpenUserLoginModal } from '@/Feature/UserLoginModal/UserLoginModal'



type Props = {}

export type FormProp = {
  _id? : string
  Userid ? : string
  category: string
  locationValue: CountryObjectType
  bathroomCount: number
  guestCount: number
  roomCount: number
  price: number
  imageSrc: string
  title: string
  description: string,
  heartlist? : Array<string>
}

function AirBnbMyHome({ }: Props) {

  const router = useRouter()

  const isOpen = useSelector((state: RootState) => state.AirBnbMyHomeModal.isOpen)

  const dispatch = useDispatch()

  const [step, setStep] = useState(1)

  const { data: session } = useSession()

  // This can be useful when you want to provide an initial value for locationValue but don't have all the details yet. Using {} as CountryObjectType allows you to start with an empty object that you can later fill with the required properties.
  const [formData, setFormData] = useState<FormProp>({
    category: "",
    locationValue: {} as CountryObjectType,
    bathroomCount: 1,
    roomCount: 1,
    guestCount: 1,
    price: 0,
    imageSrc: "",
    title: "",
    description: ""
  })

  const next = () => {
    if (step < 6) {
      setStep(step + 1)
    }
  }

  const prev = () => {
    if (step >= 1) {
      setStep(step - 1)
    }
  }

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post('/api/listing', formData)
    },
    onSuccess: () => {
      //reset formData
      setFormData({
        ...formData,
        category: "",
        locationValue: {} as CountryObjectType,
        bathroomCount: 1,
        roomCount: 1,
        guestCount: 1,
        price: 0,
        imageSrc: "",
        title: "",
        description: ""
      })

      setStep(1)
      dispatch(CloseAirBnbMyHomeModal())
      toast.success("you have succesfully registered your property ")
      router.refresh()
    },
    onError: () => {
      toast.error("something went  wrong contact the help team to assit you ")
    }
  })

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    mutation.mutate()
  }


  // dynamically importing the map as it is not compatible with ssr and so we are also disabling it for this purpose 
  const Map = useMemo(() => dynamic(() => import('../Map/Map'), {
    ssr: false
  }), [formData.locationValue]);

  type currentFormProp = {
    title: string
    body: JSX.Element
    footer: JSX.Element
  }

  const currentForm = (): currentFormProp => {

    //giving the empty value as ts compiler gives error of  Variable 'title' and others is used before being assigned
    let title: string = '';
    let body: JSX.Element = <></>;
    let footer: JSX.Element = <></>;

    const handleIntermediateStep  = ()=>{
      if(!session?.user){
        dispatch(OpenUserLoginModal())
        toast.success("Keep the momentum. Log in now for more.")
        return 
      }
      next()

    }


    if (step === 1) {

      title = "which of the following best represents your choice ?"

      body =
        <main className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {
            category.map(item => (
              <div key={item.label} onClick={e => setFormData({ ...formData, category: item.label })}
                className={`min-w-max flex flex-row item-center justify-start gap-1 px-2 py-3 shadow-sm border-2 rounded-md border-neutral-300 ${formData.category === item.label ? "ring-2 ring-neutral-500 ring-offset-4 ring-offset-slate-50" : null}`}>
                <Image className="w-[25px] h-[25]" src={item.Icon} alt='cat-img' />
                <span>{item.label}</span>
              </div>
            ))
          }
        </main>

      footer =
        <>
          <main >
            <Button
              isDisabled={formData.category.length < 2}
              className=' bg-rose-500' variant="light" onPress={next}>
              Next
            </Button>
            {/* <Button className=' bg-rose-500' onPress={onClose}>
              Next
            </Button> */}
          </main>
        </>


    }

    else if (step === 2) {
      title = "country"

      body =
        <>

          <SelectComponent setFormData={setFormData} formData={formData} />
          <Map
            position={formData.locationValue?.latlong}
          />
        </>

      footer =
        <>
          <Button className=' bg-rose-500' onPress={prev}>
            previous
          </Button>
          <Button
            isDisabled={formData.locationValue.latlong === null}
            className=' bg-rose-500' variant="light" onPress={next} >
            Next
          </Button>
        </>

    }


    else if (step === 3) {


      body =
        <>
          <Counter
            Heading={"Guest"}
            SubHeading={"How many guest do you allow ?"}
            formData={formData}
            setFormData={setFormData}
            targetProperty={"guestCount"}
          />

          <hr />

          <Counter
            Heading={"Bathrooms"}
            SubHeading={"How many bathrooms do you have ? "}
            formData={formData}
            setFormData={setFormData}
            targetProperty={"bathroomCount"}
          />

          <hr />

          <Counter
            Heading={"Rooms"}
            SubHeading={"How many rooms do you have ?"}
            formData={formData}
            setFormData={setFormData}
            targetProperty={"roomCount"}
          />
        </>

      footer =
        <>
          <Button className=' bg-rose-500' onPress={prev}>
            previous
          </Button>
          <Button
            className=' bg-rose-500' variant="light" onPress={handleIntermediateStep} >
            Next
          </Button>
        </>

    }

    else if (step === 4) {

      title = "Upload one image of your property"

      body =
        <>
          <UploadImg
            setFormData={setFormData}
            formData={formData}
          />
        </>

      footer =
        <>
          <Button className=' bg-rose-500' onPress={prev}>
            previous
          </Button>
          <Button
            isDisabled={formData.imageSrc.length < 3}
            className=' bg-rose-500' variant="light" onPress={next} >
            Next
          </Button>
        </>
    }

    else if (step === 5) {

      title = "Describe Your Property "

      body =
        <main
          className=' flex flex-col gap-4'
        >
          <Input
            isRequired
            type="text"
            label="title"
            className="max-w-xs"
            onChange={e => setFormData({ ...formData, title: e.target.value })} />

          <hr />

          <Input
            isRequired
            type="text"
            label="Description"
            placeholder="Simple and Sweet works Well !"
            className="max-w-xs"
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />

        </main>

      footer =
        <>
          <Button className=' bg-rose-500' onPress={prev}>
            previous
          </Button>
          <Button
            isDisabled={formData.title.length < 3 || formData.description.length < 3}
            className=' bg-rose-500' variant="light" onClick={next} >
            Next
          </Button>
        </>
    }


    else if (step === 6) {

      title = "how much do you charge per night ?"

      body =
        <>
          <Input
            isRequired
            type="number"
            label="Price"
            className="max-w-xs"
            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
          />
        </>

      footer =
        <>
          <Button isDisabled={mutation.isPending} className=' bg-rose-500' onPress={prev}>
            previous
          </Button>
          <Button isDisabled={formData.price === Number(0) || mutation.isPending} className=' bg-rose-500' variant="light" onClick={handleSubmit} >
            Submit
          </Button>
        </>
    }


    return { body, title, footer }


  }

  // console.log(formData)
  // console.log(formData.imageSrc.length < 3)
  return (

    <BaseModalForForm
      isOpen={isOpen}
      onClose={() => { dispatch(CloseAirBnbMyHomeModal()) }}
      title={currentForm().title}
      body={currentForm().body}
      footer={currentForm().footer}
    />
  )
}

export default AirBnbMyHome