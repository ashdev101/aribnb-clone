'use client'

import React, { useState } from 'react'
import BaseModal from './BaseModel'
import { Button, Input } from '@nextui-org/react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "@/Feature/Store/Store";
import { CloseUserLoginModal } from '@/Feature/UserLoginModal/UserLoginModal'
import { useSession, signIn, signOut } from "next-auth/react"
import toast from 'react-hot-toast'

import { FcGoogle } from 'react-icons/fc'
import { FaFacebookSquare } from 'react-icons/fa'
import { RiAppleFill } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'


type Props = {}

function UserLoginModal({ }: Props) {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.userLoginModal.isOpen)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  type formDataProp = {
    email: string
    password: string
  }

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (response?.error) {
        throw new Error(response.error)
      }
      return response;
    },

    onSuccess: () => {
      toast.success("login sucessfull")
      dispatch(CloseUserLoginModal())
      router.refresh()

    },
    onError : ()=>{
      toast.error("invalid credentails ")
    }
  })



  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    loginMutation.mutate()

  }




  // console.log(status === "loading")



  const body =
    <>
      <Input type="email" label="Email" variant="bordered" isRequired className=" " onChange={e => { setEmail(e.target.value) }} />
      <Input type="password" label="password" variant="bordered" isRequired className=" " onChange={e => { setPassword(e.target.value) }} />
      <Button className=" bg-rose-500 text-white p-6" onClick={e => handleLogin(e)} isLoading={loginMutation.isPending} disabled={loginMutation.isPending}> Submit</Button>
    </>

  const footer =
    <div className=' px-6 pb-4 gap-3  flex flex-col w-full'>
      <Button className="p-6 relative" radius="sm" variant="faded" onClick={() => { }}>
        <div className=" absolute left-2 top-3">
          <FaFacebookSquare size={18} />
        </div>
        <span>Login With Facebook</span>
      </Button>
      <Button className="p-6 relative" radius="sm" variant="faded" onClick={() => { }}>
        <div className=" absolute left-2 top-3">
          <FcGoogle size={18} />
        </div>
        <span>Login With Google</span>
      </Button>
      <Button className="p-6 relative" radius="sm" variant="faded" onClick={() => { }}>
        <div className=" absolute left-2 top-3">
          <RiAppleFill size={18} />
        </div>
        <span>Login With Apple</span>
      </Button>
      <Button className="p-6 relative" radius="sm" variant="faded" onClick={() => { }}>
        <div className=" absolute left-2 top-3">
          <AiOutlineMail size={18} />
        </div>
        <span>Login With Email</span>
      </Button>

    </div>
  return (
    <BaseModal
      title={"Log in to your account"}
      body={body}
      fotter={footer}
      onClose={() => dispatch(CloseUserLoginModal())}
      isOpen={isOpen}
    />
  )
}

export default UserLoginModal