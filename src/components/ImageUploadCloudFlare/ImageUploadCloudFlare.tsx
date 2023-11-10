'use client'

// Method - 1
//  import { ChangeEvent, FormEvent, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';

// const UploadImg = () => {
//     const [file, setFile] = useState<File>();
//     const [filename, setFilename] = useState('');

//     const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setFile(event.target.files[0]);
//             setFilename(event.target.files[0].name);
//         }
//     };

//     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         const formData = new FormData();
//         formData.append('file', file as File);
//         formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_preset_NAME}`);

//         try {
//             const response = await axios.post(
//                 ` https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//                 formData
//             );
//             console.log(response);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <input type='file' onChange={handleFileChange} />
//                 <label>{filename}</label>
//             </div>
//             {
//                 file && <Image src={filename} alt={filename} width={100} height={100} className=' w-[250px] h-[250px] object-fill' />
//             }
//             <button type="submit">Upload</button>
//         </form>
//     );
// };

// export default UploadImg;


//refer the document thats it.. here i have used the widgets provided by the cloudfare nextjs community 

import React from 'react'
import { FormProp } from "../Model/AirBnbMyHome";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";


type Props = {

    formData: FormProp
    setFormData: Dispatch<SetStateAction<FormProp>>
}

declare global {
    var cloudinary: any
}

const uploadPreset = `${process.env.NEXT_PUBLIC_CLOUDINARY_preset_NAME}`;

function ImageUploadCloudFlare({ formData, setFormData }: Props) {




    return (

        //simple copy paste from the documnet 

        <CldUploadWidget
            uploadPreset={uploadPreset}
            onSuccess={
                (result: any) => {
                    setFormData({ ...formData, imageSrc: result.info.secure_url });
                }
            }
        >
            {({ open }) => {
                function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
                    e.preventDefault();
                    open();
                }
                return (
                    <>
                        <button className="button" onClick={handleOnClick}>
                        {/* if user has uploaded the images alreay no point of showing him Upload an Image Again */}
                            {!formData.imageSrc && <span>Upload an Image</span>}
                        </button>

                        {
                            formData.imageSrc &&
                            (
                                <Image src={formData.imageSrc} alt='imgYouAdded' width={200} height={200}
                                    className=' w-[100%] h-[100%] object-fill'
                                />
                            )
                        }

                    </>
                );
            }}
        </CldUploadWidget>


    );

}

export default ImageUploadCloudFlare

