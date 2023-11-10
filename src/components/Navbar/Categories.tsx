'use client'
import React, { useEffect, useRef, useState } from 'react'
import Aframes from '/public/aFrames.jpg'
import AmazingPool from '/public/amazingPool.jpg'
import AmazingView from '/public/amazingView.jpg'
import Boats from '/public/boats.jpg'
import Breachfront from '/public/breachfront.jpg'
import Breakfast from '/public/breakfast.jpg'
import Cabins from '/public/cabins.jpg'
import Camping from '/public/camping.jpg'
import Castle from '/public/castle.jpg'
import Caves from '/public/caves.jpg'
import CountrySide from '/public/countrySide.jpg'
import Design from '/public/design.jpg'
import EarthHomes from '/public/earthHomes.jpg'
import Farms from '/public/farms.jpg'
import HistoricalHomes from '/public/historicalHomes.jpg'
import IconicCites from '/public/iconicCites.jpg'
import Island from '/public/island.jpg'
import Lakefront from '/public/lakefront.jpg'
import Luxe from '/public/luxe.jpg'
import Mansions from '/public/mansions.jpg'
import NationalPark from '/public/nationalPark.jpg'
import New from '/public/new.jpg'
import Omg from '/public/omg.jpg'
import Rooms from '/public/rooms.jpg'
import Skiing from '/public/skiing.jpg'
import TinyHomes from '/public/tinyHomes.jpg'
import TopOfTheWorld from '/public/topOfTheWorld.jpg'
import TreeHouses from '/public/treeHouses.jpg'
import Trending from '/public/trending.jpg'
import Tropical from '/public/tropical.jpg'
import VineYard from '/public/vineYard.jpg'
import Image from 'next/image'

import { AiOutlineLeft } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import CategoryBox from './CategoryBox'

type Props = {}

export const category = [
    {
        label: "A Frames",
        Icon: Aframes,
    },
    {
        label: "Amazing Pools",
        Icon: AmazingPool,
    },
    {
        label: "Amazing View",
        Icon: AmazingView,
    },
    {
        label: "Boats",
        Icon: Boats,
    },
    {
        label: "Beach Front",
        Icon: Breachfront,
    },
    {
        label: "Breakfast",
        Icon: Breakfast,
    },
    {
        label: "Cabins",
        Icon: Cabins,
    },
    {
        label: "Camping",
        Icon: Camping,
    },
    {
        label: "Castle",
        Icon: Castle,
    },
    {
        label: "Caves",
        Icon: Caves,
    },
    {
        label: "Country Side",
        Icon: CountrySide,
    },
    {
        label: "Design",
        Icon: Design,
    },
    {
        label: "Earth Homes",
        Icon: EarthHomes,
    },
    {
        label: "Farms",
        Icon: Farms,
    },
    {
        label: "Historical Homes",
        Icon: HistoricalHomes,
    },
    {
        label: "Iconic Cities",
        Icon: IconicCites,
    },
    {
        label: "Island",
        Icon: Island,
    },
    {
        label: "Lake Front",
        Icon: Lakefront,
    },
    {
        label: "Luxe",
        Icon: Luxe,
    },
    {
        label: "Mansions",
        Icon: Mansions,
    },
    {
        label: "National Park",
        Icon: NationalPark,
    },
    {
        label: "New",
        Icon: New,
    },
    {
        label: "Omg",
        Icon: Omg,
    },
    {
        label: "Rooms",
        Icon: Rooms,
    },
    {
        label: "Skiing",
        Icon: Skiing,
    },
    {
        label: "Tiny Homes",
        Icon: TinyHomes,
    },
    {
        label: "Top Of The World",
        Icon: TopOfTheWorld,
    },
    {
        label: "Tree Houses",
        Icon: TreeHouses,
    },
    {
        label: "Trending",
        Icon: Trending,
    },
    {
        label: "Tropical",
        Icon: Tropical,
    },
    {
        label: "Vineyard",
        Icon: VineYard,
    },

]

function Categories({ }: Props) {
    const [elementWidth, setelementWidth] = useState(0);

    const widthref = useRef(null);
    const clickHandlerright = () => {
       
        const slideby = elementWidth || 100
        if (widthref.current && elementWidth){
        widthref.current.scrollBy({ left: slideby });
    }


    };
    const clickHandlerleft = () => {
        const slider = document.getElementById("slider")
        const slideby = elementWidth || 100
        
        if (widthref.current && elementWidth){
           
            widthref.current.scrollBy({ left: -slideby});
        }
    };


    

    useEffect(() => {
        if (widthref.current) {
            setelementWidth(widthref.current.clientWidth)
        }
    }, [widthref]);




    return (
        <main className={`flex flex-row justify-between items-center gap-5 overflow-hidden max-w-[100%] relative`}  >

            <div className=' max-w-max h-[100%] bg-white  absolute left-0 flex items-center z-20' onClick={e => clickHandlerleft()}>

                <div className=' p-1   rounded-full border-2 border-neutral-500   bg-neutral-200'>

                    <AiOutlineLeft size={20} />
                </div>
            </div>
            <div id='slider' style={{}} className={`flex flex-row justify-between items-center gap-5 overflow-x-scroll scroll-smooth max-w-[100%] transition scrollbar-hide`} ref={widthref}>

                {
                    category.map((item, index) => (
                        <CategoryBox
                        key={item.label}
                        index={index}
                        icon={item.Icon}
                        label={item.label}
                        />
                    ))
                }
            </div>
            <div className=' max-w-max h-[100%] bg-white right-0 absolute flex items-center z-20' onClick={e => clickHandlerright()}>

                <div className=' p-1   rounded-full border-2 border-neutral-500   bg-neutral-200'>

                    <AiOutlineRight size={20} />
                </div>
            </div>
        </main >
    )
}

export default Categories