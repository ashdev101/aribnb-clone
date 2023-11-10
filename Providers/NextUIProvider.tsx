'use client'
import {NextUIProvider} from "@nextui-org/react";

type Props = {
    children: React.ReactNode
}

function NextUIProviderSetup({children}: Props) {
  return (
    <NextUIProvider>
    {children}
    </NextUIProvider>
  )
}

export default NextUIProviderSetup