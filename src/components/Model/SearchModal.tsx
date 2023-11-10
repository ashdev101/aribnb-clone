'use client'
import React, { useMemo, useState } from 'react'
import BaseModalForForm from './BaseModalForForm'
import Calender from '@/app/listing/[id]/Calender'
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseSearchModal } from '@/Feature/SearchModalSlice/SearchModalSlice';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import dynamic from 'next/dynamic';
import Select from './Select';
import { FormProp } from './AirBnbMyHome';
import { CountryObjectType } from '@/hooks/useCountry';
import Counter from './Counter';
import { useSearchParams, useRouter } from 'next/navigation';
import { RootState } from '@/Feature/Store/Store';

type Props = {

}



type SearchFormDataState = Partial<FormProp> & {
    // dateRange: Range[];
    startDate: Date | undefined
    endDate: Date | undefined
};

function SearchModal({ }: Props) {
    const dispatch = useDispatch()
    //MAKE SURE TO IMPORT THE RANGE FROM REACT-RANGE
    const isOpen = useSelector((state: RootState) => state.SearchModal.isOpen)
    const [dateRange, setdateRange] = useState<Range[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);




    const router = useRouter()
    const [FormData, setFromData] = useState<SearchFormDataState>({
        startDate: new Date(),
        endDate: new Date(),
        locationValue: {} as CountryObjectType,
        bathroomCount: 1,
        roomCount: 1,
        guestCount: 1,
    })

    const handleDate = (item: RangeKeyDict) => {
        setdateRange([item.selection])
        console.log(item)
        setFromData({ ...FormData, startDate: item.selection.startDate, endDate: item.selection.endDate })

    }

    const Map = dynamic(() => import('@/components/Map/Map'), { ssr: false })

    const [step, setStep] = useState(1)
    const searchParams = useSearchParams()
    const next = () => {
        if (step <= 3) {
            setStep(step + 1)
        }
    }

    const previous = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }


    const handleSubmit = () => {

        const params = new URLSearchParams(searchParams)
        for (let [key, value] of Object.entries(FormData)) {
            if (key === "locationValue") {
                value = FormData.locationValue?.name
            }
            //@ts-ignore
            params.set(key, value.toString())
        }

        // console.log(params.toString())
        const queryString = params.toString()
        console.log(queryString)

        router.push(`/filter?${queryString}`)

        dispatch(CloseSearchModal())

    }

    const CurretnForm = () => {
        let title: string = ""
        let body: React.JSX.Element = <></>
        let footer: React.JSX.Element = <></>

        if (step === 1) {

            title = "When are you plannig to go ?"

            body =
                <div className=' p-3 border-[1px] shadow-md '>
                    <DateRange
                    className=' w-[100%]'
                        editableDateInputs={true}
                        onChange={handleDate}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        minDate={new Date()}
                        disabledDates={[]}
                    />



                </div>

            footer =
                <>
                    <Button onClick={() => next()}>
                        Next
                    </Button>
                </>
        }

        else if (step === 2) {

            title = "Where would you like to go ?"

            body =
                <>

                    <Select
                        setFormData={setFromData}
                        formData={FormData}
                    />
                    <Map
                        position={FormData.locationValue?.latlong}
                    />

                </>

            footer = <>

                <Button onClick={() => previous()}>
                    Previous
                </Button>
                <Button onClick={() => next()}>
                    Next
                </Button>
            </>

        }

        else if (step === 3) {

            title = "what are your requirements ? "

            body =
                <>
                    <Counter
                        Heading={"Guest"}
                        SubHeading={"How many guest do you allow ?"}
                        formData={FormData}
                        setFormData={setFromData}
                        targetProperty={"guestCount"}
                    />

                    <hr />

                    <Counter
                        Heading={"Bathrooms"}
                        SubHeading={"How many bathrooms do you have ? "}
                        formData={FormData}
                        setFormData={setFromData}
                        targetProperty={"bathroomCount"}
                    />

                    <hr />

                    <Counter
                        Heading={"Rooms"}
                        SubHeading={"How many rooms do you have ?"}
                        formData={FormData}
                        setFormData={setFromData}
                        targetProperty={"roomCount"}
                    />
                </>

            footer =
                <>
                    <Button onClick={() => previous()}>
                        Previous
                    </Button>
                    <Button onClick={() => handleSubmit()}>
                        Search
                    </Button>
                </>
        }

        return { title, body, footer }
    }

    // console.log(FormData.startDate)
    // console.log(dateRange[0].startDate)
    // console.log(FormData)

    return (
        <main>

            <BaseModalForForm
                title={CurretnForm().title}
                body={CurretnForm().body}
                footer={CurretnForm().footer}
                onClose={() => dispatch(CloseSearchModal())}
                isOpen={isOpen}
            />
        </main>
    )
}

export default SearchModal