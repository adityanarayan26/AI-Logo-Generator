'use client'
import React, { useEffect, useState } from 'react';
import Prompt from '../_data/Prompt';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Image from 'next/image';
import { DownloadIcon, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
const GenerateLogo = () => {
    const FormDataCollection = useSelector((state) => state.DataForm.FormDataCollection);
    const [loading, setLoading] = useState(false);
    const [LogoImg, setLogoImg] = useState('');
    const [Logos, setLogos] = useState([]);
    const userDetails = useSelector((state) => state.DataForm.AuthUserDetails);


    useEffect(() => {
        GetAllLogos();
    }, []);

    const GenerateAilogo = async () => {
        if (!FormDataCollection?.title) {
            console.error('FormDataCollection is missing required fields');
            setLoading(false);
            return;
        }
        setLoading(true);
        const PROMPT = Prompt.LOGO_PROMPT
            .replace('{logoTitle}', FormDataCollection?.title)
            .replace('{logoDesc}', FormDataCollection?.description)
            .replace('{logoColor}', FormDataCollection?.palette)
            .replace('{logoDesign}', FormDataCollection?.Design?.design)
            .replace('{logoPrompt}', FormDataCollection?.Design?.prompt)
            .replace('{logoIdea}', FormDataCollection?.idea || '');

        try {
            const resp = await axios.post('/api/auth/ai-logo-model', { prompt: PROMPT, email: userDetails?.email });
            setLogoImg(resp.data.image);
        } catch (error) {
            console.error('Axios Error:', error.response ? error.response.data : error);
        } finally {
            setLoading(false);
        }
    };

    const GetAllLogos = async () => {
        if (!userDetails?.id) return;
        try {
            const resp = await axios.get(`/api/auth/get-logos/${encodeURIComponent(userDetails.id)}`);
            const sortedLogos = resp.data.logos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setLogos(sortedLogos);
            // Removed setting LogoImg here to avoid overriding manual generation
        } catch (error) {
            console.log("Error fetching logos:", error.response?.data?.error || error.message);
        }
    };

    const handleGenerateLogo = async () => {
        if (FormDataCollection) {
            await GenerateAilogo();
            await GetAllLogos();
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
        <div>
            <h1 className='text-3xl font-bold capitalize text-primary my-5'>Generated Logo</h1>
            {loading ? (
                <div className='flex flex-col items-center justify-center gap-y-3'>
                    <Loader className='animate-spin text-gray-600 size-8' />
                    <h1 className='animate-pulse text-gray-600 font-semibold capitalize text-lg'>Generating Logo...</h1>
                </div>
            ) : (
                <div className='flex flex-col gap-y-5 justify-center items-center'>
                    {LogoImg ? (
                        <Image src={LogoImg?.base64Image} alt='LogoImage' className='rounded-lg shadow-lg' width={300} height={200} />
                    ) : Logos.length > 0 ? (
                        <Image
                            src={Logos[Logos.length - 1]?.base64Image}
                            alt='Most Recent Logo'
                            className='rounded-lg shadow-lg'
                            width={300}
                            height={200}
                        />
                    ) : (
                        <p><Loader className='text-gray-600 animate-spin size-5 w-full text-center '/></p>
                    )}
                    <div className='flex gap-x-3'>

                        <Button onClick={handleGenerateLogo}>Generate Again </Button>
                        <Button onClick={() => handleDownload((LogoImg?.base64Image || Logos[Logos.length - 1]?.base64Image), FormDataCollection?.title)}>Download <DownloadIcon /></Button>
                    </div>
                </div>
            )}
            <div className='pt-5 border-t mt-10'>
                {Logos && Logos.length > 0 ? (
                    <>
                        <h1 className='text-3xl text-primary font-semibold capitalize'>Your Logo Gallery</h1>
                        <div className='flex flex-wrap gap-5 py-10'>
                            {Logos.map((item, index) => (
                                <div key={index} className='relative'>
                                    <Image
                                        src={item.base64Image}
                                        alt={`Logo ${index}`}
                                        className='rounded-lg shadow-lg'
                                        width={300}
                                        height={200}
                                    />
                                    <div className='absolute top-3  right-3 cursor-pointer'>

                                        <DownloadIcon className='text-primary' size={30} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : <p><Loader className='text-gray-600 animate-spin size-5 w-full text-center '/></p>}
            </div>
        </div>
    );
};

export default GenerateLogo;