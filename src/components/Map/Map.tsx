'use client'
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

type MyMapProps = {
    position: [number, number] | undefined
}

export default function MyMap({ position }: MyMapProps) {

    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';


    return (
        <MapContainer
            center={position  || [20, 77]}
            zoom={position ? 4 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg relative z-10
            "
        >
            <TileLayer
                url={url}
                attribution={attribution}
            />
            {position && (
                <Marker position={position } />
            )}
        </MapContainer>
    )
}