'use client'

import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"

import React from 'react'

type Props = {
    children: React.ReactNode
}

function AuthSessionProvider({ children }: Props) {
    return (
        <SessionProvider >
            {children}
        </SessionProvider>
    )
}

export default AuthSessionProvider