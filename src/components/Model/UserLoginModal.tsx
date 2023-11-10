'use client'
import BaseModal from './BaseModel'
import { Button, Input } from '@nextui-org/react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "@/Feature/Store/Store";
import { CloseUserModal } from '@/Feature/UserRegisterModal/UserRegisterModalSlice'
import { useState } from 'react'
import axios from 'axios';
import {
  useMutation,
} from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { userInfo } from 'os';

type Props = {}

function UserModal({ }: Props) {
  const isOpen = useSelector((state: RootState) => state.userModal.isOpen)
  const disptach = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  type formdataProp = {
    name: string
    email: string
    password: string

  }

  const mutation = useMutation({
    mutationFn: ({ name, email, password }: formdataProp) => {
      return axios.post('/api/auth/register', {
        name,
        email,
        password,
      }, {

      });
    },
    onSuccess:()=>{
      disptach(CloseUserModal())
      toast.success('registered succesfully')
    },
    onError:()=>{
      
      toast.error("Oops! Something's amiss. It seems you're registering with an email that's already taken")
    }
  });

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(name, email)
    e.preventDefault();
    mutation.mutate({ name, email, password })

  }

  const body =
    <>
      <Input type="text" label="Name" variant="bordered" isRequired className=" " onChange={e => { setName(e.target.value) }} />
      <Input type="email" label="Email" variant="bordered" isRequired className=" " onChange={e => { setEmail(e.target.value) }} />
      <Input type="password" label="password" variant="bordered" isRequired className=" " onChange={e => { setPassword(e.target.value) }} />
      <Button 
      disabled={mutation.isPending}
      className=" bg-rose-500 text-white p-6" onClick={e => { handleRegister(e) }}> Submit</Button>
    </>
  return (
    <div>
      <BaseModal
        title={'Register'}
        body={body}
        isOpen={isOpen}
        onClose={() => { disptach(CloseUserModal()) }}
      />
    </div>
  )
}

export default UserModal