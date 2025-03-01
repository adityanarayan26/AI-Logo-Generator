'use client'
import axios from 'axios';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
const Page = () => {
    const userDetails = useSelector((state) => state.DataForm.AuthUserDetails);
    const FormDataCollection = useSelector((state) => state.DataForm.FormDataCollection);
    const [Logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetLogos();
    }, []);

    const GetLogos = async () => {
        try {
            const resp = await axios.get(`/api/auth/get-logos/${userDetails?.id}`);
            setLogos(resp.data.logos);
        } catch (error) {
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    };
    const handleDownload = (base64Image, title) => {
        const byteString = atob(base64Image.split(',')[1]);
        const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        saveAs(blob, `${title}.png`);
    };
    return (
        <div className='mt-10 px-10'>

            <h3 className='text-primary font-bold text-4xl capitalize'>Hello, {userDetails.fullname}</h3>

            <h1 className='text-3xl font-bold capitalize pt-8'>Dashboard</h1>
<h1 className='font-semibold text-black capitalize text-sm'>Click the image to download</h1>
            <div className='flex pt-5 flex-wrap gap-8'>
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <p className='text-gray-600 animate-pulse text-lg  flex items-center gap-x-2'><LoaderIcon className='animate-spin size-6 text-gray-600' />Loading</p>
                    </div>
                ) : Logos.length > 0 ? (
                    Logos.map((item, index) => (
                        <div key={index}>
                            <Image src={item?.base64Image} width={300} height={200} alt='logo' className='shadow-xl cursor-pointer hover:border border-primary transition-all ease-linear duration-100' onClick={() => handleDownload((item?.base64Image), FormDataCollection?.title)}  loading="lazy"/>


                        </div>
                    ))
                ) : (
                    <h1 className='text-black text-4xl'>No Logos</h1>
                )}
            </div>
        </div>
    );
};

export default Page;