import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'

import NextUIProviderSetup from '../../Providers/NextUIProvider'
import ReduxToolkitProvider from '../../Providers/ReduxToolkitProvider'
import UserModal from '@/components/Model/UserRegisterModel'
import AuthSessionProvider from '../../Providers/AuthSessionProvider'
import ReactQueryProvider from '../../Providers/ReactQueryProvider'
import UserLoginModal from '@/components/Model/UserLoginModal'
import RentModel from '@/components/Model/RentModel'
import BaseModalForForm from '@/components/Model/BaseModalForForm'
import AirBnbMyHome from '@/components/Model/AirBnbMyHome'
import { Toaster } from 'react-hot-toast'
import Test from '@/components/test/Test'
import SearchModal from '@/components/Model/SearchModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthSessionProvider>
            <ReduxToolkitProvider>
              <NextUIProviderSetup>
                
                <div className='px-1 md:px-5 overflow-hidden'>
                <Navbar />
                <UserModal />
                <UserLoginModal/>
                <AirBnbMyHome/>
                <SearchModal/>
                {/* <Test/> */}
                {/* <RentModel/> */}
                <Toaster/>
                {children}
                </div>
              </NextUIProviderSetup>
            </ReduxToolkitProvider>
          </AuthSessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
