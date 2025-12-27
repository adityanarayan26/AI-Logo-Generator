'use client'
import React, { useEffect, useState } from 'react';
import Prompt from '../_data/Prompt';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Image from 'next/image';
import { Download, Loader2, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import Loading from '../_components/Loading';

const GenerateLogo = () => {
    const FormDataCollection = useSelector((state) => state.DataForm.FormDataCollection);
    const [loading, setLoading] = useState(false);
    const [LogoImg, setLogoImg] = useState('');
    const [Logos, setLogos] = useState([]);
    const userDetails = useSelector((state) => state.DataForm.AuthUserDetails);

    useEffect(() => {
        if (userDetails?.id) {
            GetAllLogos();
        }
    }, [userDetails?.id]);

    const GenerateAilogo = async () => {
        if (!FormDataCollection?.title) {
            console.error('FormDataCollection is missing required fields');
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
            const resp = await axios.post('/api/auth/ai-logo-model', {
                prompt: PROMPT,
                email: userDetails?.email,
                uid: userDetails?.id
            });
            setLogoImg(resp.data.image);
        } catch (error) {
            console.error('Error generating logo:', error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    const GetAllLogos = async () => {
        if (!userDetails?.id) return;
        try {
            const resp = await axios.get(`/api/auth/get-logos/${encodeURIComponent(userDetails.id)}`);
            const sortedLogos = (resp.data.logos || []).sort((a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            );
            setLogos(sortedLogos);
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

    const handleDownload = async (imageSrc, title) => {
        if (!imageSrc) return;

        // Handle Base64
        if (imageSrc.startsWith('data:')) {
            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            saveAs(blob, `${title || 'logo'}.png`);
            return;
        }

        // Handle URL (Cloudinary/Pollinations)
        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            saveAs(blob, `${title || 'logo'}.png`);
        } catch (error) {
            console.error("Error downloading image:", error);
            // Fallback: open in new tab
            window.open(imageSrc, '_blank');
        }
    };

    const currentLogo = LogoImg || (Logos.length > 0 ? (Logos[0]?.image || Logos[0]?.base64Image) : null);

    return (
        <div className='min-h-screen py-10'>
            {/* Header */}
            <div className='flex items-center justify-between mb-10'>
                <div>
                    <Link href='/create' className='inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors'>
                        <ArrowLeft className='w-4 h-4' />
                        Back to Editor
                    </Link>
                    <h1 className='text-4xl font-bold text-white'>
                        <span className='text-gradient'>Generated Logo</span>
                    </h1>
                    <p className='text-gray-400 mt-2'>
                        {FormDataCollection?.title ? `Logo for "${FormDataCollection.title}"` : 'Your AI-generated logo'}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Generated Logo Display */}
                <div className='lg:col-span-2'>
                    <div className='glass-card rounded-2xl p-8'>
                        {loading ? (
                            <div className='min-h-[400px] flex items-center justify-center'>
                                <Loading fullScreen={false} message="Analyzing prompt & generating logo..." />
                            </div>
                        ) : currentLogo ? (
                            <div className='flex flex-col items-center'>
                                <div className='relative rounded-2xl overflow-hidden shadow-2xl'>
                                    <Image
                                        src={currentLogo}
                                        alt='Generated Logo'
                                        width={400}
                                        height={400}
                                        className='rounded-2xl'
                                        loading="lazy"
                                        unoptimized={true}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className='flex gap-4 mt-8'>
                                    <Button
                                        onClick={handleGenerateLogo}
                                        variant='outline'
                                        className='flex items-center gap-2 border-white/20 text-white hover:bg-white/10'
                                    >
                                        <RefreshCw className='w-4 h-4' />
                                        Generate Again
                                    </Button>
                                    <Button
                                        onClick={() => handleDownload(currentLogo, FormDataCollection?.title)}
                                        className='btn-primary flex items-center gap-2'
                                    >
                                        <Download className='w-4 h-4' />
                                        Download
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center py-20'>
                                <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6'>
                                    <Sparkles className='w-10 h-10 text-purple-400' />
                                </div>
                                <p className='text-xl text-white font-medium'>Ready to Generate</p>
                                <p className='text-gray-400 mt-2 mb-6'>Click the button below to create your logo</p>
                                <Button onClick={handleGenerateLogo} className='btn-primary'>
                                    Generate Logo
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Logo Details Sidebar */}
                <div className='space-y-6'>
                    {/* Current Settings */}
                    <div className='glass-card rounded-2xl p-6'>
                        <h3 className='text-lg font-semibold text-white mb-4'>Logo Details</h3>
                        <div className='space-y-3'>
                            <div>
                                <p className='text-gray-400 text-sm'>Brand Name</p>
                                <p className='text-white font-medium'>{FormDataCollection?.title || '-'}</p>
                            </div>
                            <div>
                                <p className='text-gray-400 text-sm'>Style</p>
                                <p className='text-white font-medium'>{FormDataCollection?.Design?.design || '-'}</p>
                            </div>
                            <div>
                                <p className='text-gray-400 text-sm'>Color Palette</p>
                                <p className='text-white font-medium'>{FormDataCollection?.palette || '-'}</p>
                            </div>
                            <div>
                                <p className='text-gray-400 text-sm'>Idea</p>
                                <p className='text-white font-medium'>{FormDataCollection?.idea || '-'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className='glass-card rounded-2xl p-6'>
                        <h3 className='text-lg font-semibold text-white mb-4'>Quick Actions</h3>
                        <div className='space-y-3'>
                            <Link href='/create' className='block'>
                                <Button variant='outline' className='w-full border-white/20 text-white hover:bg-white/10'>
                                    Create New Logo
                                </Button>
                            </Link>
                            <Link href='/dashboard' className='block'>
                                <Button variant='ghost' className='w-full text-gray-400 hover:text-white hover:bg-white/10'>
                                    View All Logos
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            {Logos.length > 0 && (
                <div className='mt-16'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-white'>Your Logo Gallery</h2>
                        <Link href='/dashboard'>
                            <Button variant='ghost' className='text-gray-400 hover:text-white'>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                        {Logos.slice(0, 6).map((item, index) => (
                            <div key={index} className='logo-card group'>
                                <div className='relative aspect-square'>
                                    <Image
                                        src={item.image || item.base64Image}
                                        alt={`Logo ${index + 1}`}
                                        fill
                                        className='object-cover rounded-2xl'
                                        loading="lazy"
                                        unoptimized={true}
                                    />
                                    <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center'>
                                        <button
                                            onClick={() => handleDownload(item.image || item.base64Image, `logo-${index + 1}`)}
                                            className='p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors'
                                        >
                                            <Download className='w-5 h-5 text-white' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerateLogo;