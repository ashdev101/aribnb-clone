'use client'
import React, { Dispatch, SetStateAction } from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import useCountry from "@/hooks/useCountry";
import { FormProp } from "./AirBnbMyHome";

type SelectProps = {
    // onChange  :  (e : React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void 
    setFormData: Dispatch<SetStateAction<FormProp>> | Dispatch<SetStateAction<any>>
    formData: FormProp | any
}


function Selectcom({ setFormData, formData }: SelectProps) {
    const { getAllCountrydata } = useCountry()


    return (
        <Select
            className="max-w-xs"
            label="Select country"
        >

            {
                getAllCountrydata.map(item => (

                    <SelectItem
                        key={item.name}
                        value={item.name}
                        className=" flex flex-row items-center gap-2"
                        onClick={() =>
                            setFormData({ ...formData, locationValue: item })
                        }
                    >
                        {/* <div>{item.flag}</div> */}
                        {item.name}
                    </SelectItem>
                ))
            }


        </Select>
    );

}

export default Selectcom
