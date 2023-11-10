import React from 'react'
import MenuItem from './MenuItem'
import { OpenUserModal } from '@/Feature/UserRegisterModal/UserRegisterModalSlice'
import { OpenUserLoginModal } from '@/Feature/UserLoginModal/UserLoginModal'
import { useSession, signIn, signOut } from "next-auth/react"
import { useDispatch } from 'react-redux'
import { OpenAirBnbMyHomeModal } from '@/Feature/AirBnbMyHome/AirbnbMyHomeSlice'
import { useRouter } from 'next/navigation'


type Props = {
    isOpeN: boolean
    setIsOpeN: React.Dispatch<React.SetStateAction<boolean>>

}

function UserMenuOption({ isOpeN, setIsOpeN }: Props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const { data: session, status } = useSession()
    return (
        <div className=' absolute rounded-xl shadow-md w-[40vw] md:[75vw] bg-white overflow-hidden right-0 top-14 md:top-[50px] text-sm transition'>
            <div onClick={e => setIsOpeN(!isOpeN)}>
                {/* we are passing the function inside the onClick  */}
                <MenuItem onClick={() => dispatch(OpenUserModal())} label={"Register"} isVisible={status != "authenticated"} />
            </div>

            <div onClick={e => setIsOpeN(!isOpeN)}>
                <MenuItem onClick={() => { dispatch(OpenUserLoginModal()) }} label={"LogIn"} isVisible={status != "authenticated"} />
            </div>

            <div onClick={e => setIsOpeN(!isOpeN)}>
                <MenuItem onClick={() => { dispatch(OpenAirBnbMyHomeModal()) }} label={"Airbnb Your Home"} isVisible={status === "authenticated"} />
            </div>
            <div onClick={e => setIsOpeN(!isOpeN)}>
                <MenuItem onClick={() => { router.push("/dashboard/listings") }} label={"My listings"} isVisible={status === "authenticated"} />
            </div>
            {/* <div onClick={e => setIsOpeN(!isOpeN)}>
                                <MenuItem onClick={() => signOut()} label={"My Reservations"} isVisible={status === "authenticated"} />
                            </div> */}
            <div onClick={e => setIsOpeN(!isOpeN)}>
                <MenuItem onClick={() => { router.push("/dashboard/favourite") }} label={"My Favourite"} isVisible={status === "authenticated"} />
            </div>

            <div onClick={e => setIsOpeN(!isOpeN)}>
                <MenuItem onClick={() => signOut()} label={"LogOut"} isVisible={status === "authenticated"} />
            </div>

        </div>
    )
}

export default UserMenuOption