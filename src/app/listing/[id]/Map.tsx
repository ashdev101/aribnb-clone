'use client'

import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'

type Props = {
    latlong: [number, number]
}

function Map({ latlong }: Props) {

    const Map = useMemo(() => dynamic(() => import('@/components/Map/Map'), {
        ssr: false
    }), [latlong]);

    return (
        <div className=' max-w-full max-h-fit'>

        <Map
            position={latlong}
            />
            </div>
    )
}

export default Map