
import { AiOutlineMinus } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { FormProp } from './AirBnbMyHome'
import { Dispatch, SetStateAction } from 'react'

type Props = {
    Heading : string 
    SubHeading : string
    targetProperty: string
    formData: FormProp | any
    setFormData: Dispatch<SetStateAction<FormProp>> | Dispatch<SetStateAction<any>>
}


function Counter({ formData, setFormData, targetProperty ,Heading , SubHeading }: Props) {

    const handleIncrease = () => {
        //@ts-ignore
        setFormData({ ...formData, [targetProperty]: formData[targetProperty] + 1 })
    }

    const handleDecrease = () => {
        //@ts-ignore
        if (formData[targetProperty] <= 1) {
            return
        }
        //@ts-ignore
        setFormData({ ...formData, [targetProperty]: formData[targetProperty] - 1 })
    }

    return (
        <main className=' flex flex-row items-center justify-between '>
            <div className=' flex flex-col gap-2 items-center'>
                <span className=' font-bold text-md '>
                    {Heading}
                </span>

                <span className=' font-light text-sm'>
                    {SubHeading}
                </span>
            </div>

            <div
                className=' flex flex-row items-center justify-center gap-3 pb-2' >

                <div
                    onClick={() => handleIncrease()}
                    className='  rounded-full  border-1 border-neutral-300 cursor-pointer '>
                    <div className='flex items-center justify-center  p-1 text-neutral-400 '>
                        <AiOutlinePlus size={20} />
                    </div>
                </div>
                <span>

                    {
                        //@ts-ignore
                        formData[targetProperty]
                    }
                </span>
                <div
                    onClick={() => handleDecrease()}
                    className='  rounded-full  border-1 border-neutral-300 cursor-pointer '>
                    <div className='flex items-center justify-center  p-1 text-neutral-400 '>
                        <AiOutlineMinus size={20} />
                    </div>
                </div>

            </div>


        </main>
    )
}

export default Counter