'use client'
import React, { useEffect, useState } from 'react';
import Prompt from '../_data/Prompt';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Image from 'next/image';
import { Download, Loader2, RefreshCw, Sparkles, ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import MultiStepLoader from '../_components/MultiStepLoader';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { X, ChevronDown } from 'lucide-react';


const GenerateLogo = () => {
    const FormDataCollection = useSelector((state) => state.DataForm.FormDataCollection);
    const [loading, setLoading] = useState(false);
    const [LogoImg, setLogoImg] = useState('');
    const [Logos, setLogos] = useState([]);
    const userDetails = useSelector((state) => state.DataForm.AuthUserDetails);

    const [saving, setSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!FormDataCollection?.title) {
            router.push('/create');
        }
    }, [FormDataCollection, router]);

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
        setIsSaved(false);

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

    const handleSaveLogo = async () => {
        if (!LogoImg || !userDetails) return;
        setSaving(true);
        try {
            const resp = await axios.post('/api/auth/save-logo', {
                logoUrl: LogoImg,
                email: userDetails?.email,
                uid: userDetails?.id
            });
            await GetAllLogos();
            setIsSaved(true);
            // data.image contains the Cloudinary Secure URL
            setLogoImg(resp.data.image);
        } catch (error) {
            console.error('Error saving logo:', error);
        } finally {
            setSaving(false);
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
        }
    };

    const handleDownload = async (format = 'png') => {
        if (!currentLogo) return;

        const title = FormDataCollection?.title || 'logo';
        const filename = `${title}.${format}`;

        try {
            // Helper to get Base64 from URL or use existing Base64
            const getBase64Image = async (url) => {
                if (url.startsWith('data:')) return url;

                try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                } catch (e) {
                    console.error("Error converting to base64", e);
                    // Return raw url as fallback (though it might fail invalid viewers)
                    return url;
                }
            };

            if (format === 'svg') {
                // For SVG, we must embed the image as Base64 to ensure it displays offline
                const base64Data = await getBase64Image(currentLogo);
                const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><image href="${base64Data}" width="1024" height="1024"/></svg>`;
                const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
                saveAs(blob, filename);
                return;
            }

            // For PNG/JPG using Canvas
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.src = currentLogo;

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // Fill white background for JPG (otherwise transparent becomes black)
            if (format === 'jpg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, filename);
                }
            }, mimeType, format === 'jpg' ? 0.9 : 1.0); // 0.9 quality for JPG

        } catch (error) {
            console.error("Download error:", error);
            // Fallback for simple PNG download if canvas fails
            if (format === 'png') {
                saveAs(currentLogo, filename);
            }
        }
    };

    const currentLogo = LogoImg || (Logos.length > 0 ? (Logos[0]?.image || Logos[0]?.base64Image) : null);

    return (
        <div className='min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <Link href='/create' className='inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-2 transition-colors text-sm'>
                            <ArrowLeft className='w-4 h-4' />
                            Back to Editor
                        </Link>
                        <h1 className='text-3xl font-bold text-zinc-900'>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>Generated Logo</span>
                        </h1>
                        <p className='text-zinc-500 mt-1'>
                            {FormDataCollection?.title ? `Logo for "${FormDataCollection.title}"` : 'Your AI-generated logo'}
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Generated Logo Display */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-2xl border border-zinc-200 p-8'>
                            {loading ? (
                                <MultiStepLoader isLoading={loading} />
                            ) : currentLogo ? (
                                <div className='flex flex-col items-center'>
                                    <div className='relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-100'>
                                        <Image
                                            src={currentLogo}
                                            alt='Generated Logo'
                                            width={400}
                                            height={400}
                                            className='rounded-2xl cursor-zoom-in hover:scale-[1.02] transition-transform duration-300'
                                            loading="lazy"
                                            unoptimized={true}
                                            onClick={() => setIsZoomed(true)}
                                        />

                                        {/* Zoom Overlay (Click to Zoom) */}
                                        <div className='absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity'>
                                            Click to Zoom
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='flex gap-4 mt-8'>
                                        <Button
                                            onClick={handleGenerateLogo}
                                            variant='outline'
                                            className='flex items-center gap-2 border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                                        >
                                            <RefreshCw className='w-4 h-4' />
                                            Generate Again
                                        </Button>

                                        {LogoImg && !isSaved && (
                                            <Button
                                                onClick={handleSaveLogo}
                                                disabled={saving}
                                                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0'
                                            >
                                                {saving ? (
                                                    <>
                                                        <Loader2 className='w-4 h-4 animate-spin mr-2' />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className='w-4 h-4 mr-2' />
                                                        Save to Gallery
                                                    </>
                                                )}
                                            </Button>
                                        )}

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button className='bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center gap-2'>
                                                    <Download className='w-4 h-4' />
                                                    Download
                                                    <ChevronDown className='w-4 h-4 opacity-70' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem onClick={() => handleDownload('png')} className="cursor-pointer">
                                                    <span>PNG</span>
                                                    <span className="ml-auto text-xs text-zinc-400">High Quality</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDownload('jpg')} className="cursor-pointer">
                                                    <span>JPG</span>
                                                    <span className="ml-auto text-xs text-zinc-400">Compressed</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDownload('svg')} className="cursor-pointer">
                                                    <span>SVG</span>
                                                    <span className="ml-auto text-xs text-zinc-400">Vector</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>



                                </div>
                            ) : (
                                <div className='flex flex-col items-center justify-center py-20'>
                                    <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-6'>
                                        <Sparkles className='w-10 h-10 text-purple-600' />
                                    </div>
                                    <p className='text-xl text-zinc-900 font-medium'>Ready to Generate</p>
                                    <p className='text-zinc-500 mt-2 mb-6'>Click the button below to create your logo</p>
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
                        <div className='bg-white rounded-2xl border border-zinc-200 p-6'>
                            <h3 className='text-lg font-semibold text-zinc-900 mb-4'>Logo Details</h3>
                            <div className='space-y-3'>
                                <div>
                                    <p className='text-zinc-500 text-sm'>Brand Name</p>
                                    <p className='text-zinc-900 font-medium'>{FormDataCollection?.title || '-'}</p>
                                </div>
                                <div>
                                    <p className='text-zinc-500 text-sm'>Style</p>
                                    <p className='text-zinc-900 font-medium'>{FormDataCollection?.Design?.design || '-'}</p>
                                </div>
                                <div>
                                    <p className='text-zinc-500 text-sm'>Color Palette</p>
                                    <p className='text-zinc-900 font-medium'>{FormDataCollection?.palette || '-'}</p>
                                </div>
                                <div>
                                    <p className='text-zinc-500 text-sm'>Idea</p>
                                    <p className='text-zinc-900 font-medium'>{FormDataCollection?.idea || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className='bg-white rounded-2xl border border-zinc-200 p-6'>
                            <h3 className='text-lg font-semibold text-zinc-900 mb-4'>Quick Actions</h3>
                            <div className='space-y-3'>
                                <Link href='/create' className='block'>
                                    <Button variant='outline' className='w-full border-zinc-200 text-zinc-700 hover:bg-zinc-50'>
                                        Create New Logo
                                    </Button>
                                </Link>
                                <Link href='/dashboard' className='block'>
                                    <Button variant='ghost' className='w-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'>
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
                            <h2 className='text-2xl font-bold text-zinc-900'>Your Logo Gallery</h2>
                            <Link href='/dashboard'>
                                <Button variant='ghost' className='text-zinc-500 hover:text-zinc-900'>
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
            {/* Zoom Modal Overlay */}
            {isZoomed && (
                <div
                    className='fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200'
                    onClick={() => setIsZoomed(false)}
                >
                    <div className='relative max-w-[90vw] max-h-[90vh] p-2' onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setIsZoomed(false)}
                            className='absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20'
                        >
                            <X className='w-6 h-6' />
                        </button>
                        <Image
                            src={currentLogo}
                            alt='Zoomed Logo'
                            width={1024}
                            height={1024}
                            className='max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl'
                            unoptimized={true}
                        />
                    </div>
                </div>
            )}
        </div >
    );
};

export default GenerateLogo;