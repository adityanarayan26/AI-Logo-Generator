'use client'
import axios from 'axios';
import { Download, Grid, List, Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Loading from '../_components/Loading';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Page = () => {
    const userDetails = useSelector((state) => state.DataForm.AuthUserDetails);
    const [Logos, setLogos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (userDetails?.id) {
            GetLogos();
        }
    }, [userDetails?.id]);

    const GetLogos = async () => {
        try {
            const resp = await axios.get(`/api/auth/get-logos/${userDetails?.id}`);
            setLogos(resp.data.logos || []);
        } catch (error) {
            console.log(error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (imageSrc, index) => {
        if (!imageSrc) return;

        if (imageSrc.startsWith('data:')) {
            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            saveAs(blob, `logo-${index + 1}.png`);
            return;
        }

        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            saveAs(blob, `logo-${index + 1}.png`);
        } catch (error) {
            console.error("Error downloading image:", error);
            window.open(imageSrc, '_blank');
        }
    };

    const filteredLogos = Logos.filter(logo =>
        logo?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery
    );

    return (
        <div className='min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-zinc-900'>
                            Welcome back, <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>{userDetails?.fullname || 'Creator'}</span>
                        </h1>
                        <p className='text-zinc-500 mt-1'>Manage and download your generated logos</p>
                    </div>
                    <Link href='/create'>
                        <Button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl'>
                            <Sparkles className='w-4 h-4 mr-2' />
                            Create New Logo
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                    <div className='bg-white rounded-2xl border border-zinc-200 p-6'>
                        <p className='text-zinc-500 text-sm'>Total Logos</p>
                        <p className='text-3xl font-bold text-zinc-900 mt-1'>{Logos.length}</p>
                    </div>
                    <div className='bg-white rounded-2xl border border-zinc-200 p-6'>
                        <p className='text-zinc-500 text-sm'>This Month</p>
                        <p className='text-3xl font-bold text-zinc-900 mt-1'>{Logos.length}</p>
                    </div>
                    <div className='bg-white rounded-2xl border border-zinc-200 p-6'>
                        <p className='text-zinc-500 text-sm'>Downloads</p>
                        <p className='text-3xl font-bold text-zinc-900 mt-1'>Unlimited</p>
                    </div>
                </div>

                {/* Gallery Header */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                    <h2 className='text-xl font-semibold text-zinc-900'>Your Logos</h2>
                    <div className='flex items-center gap-3'>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400' />
                            <input
                                type='text'
                                placeholder='Search logos...'
                                className='bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className='flex items-center gap-1 bg-white rounded-xl border border-zinc-200 p-1'>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}
                            >
                                <Grid className='w-4 h-4' />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'}`}
                            >
                                <List className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                {loading ? (
                    <Loading fullScreen={false} />
                ) : filteredLogos.length > 0 ? (
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
                        {filteredLogos.map((item, index) => (
                            <div key={index} className='bg-white rounded-2xl border border-zinc-200 overflow-hidden group hover:shadow-lg transition-shadow'>
                                <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'h-40'}`}>
                                    <Image
                                        src={item?.image || item?.base64Image}
                                        fill
                                        alt={`Logo ${index + 1}`}
                                        className='object-cover'
                                        loading="lazy"
                                        unoptimized={true}
                                    />
                                    <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                        <button
                                            onClick={() => handleDownload(item?.image || item?.base64Image, index)}
                                            className='flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition-colors'
                                        >
                                            <Download className='w-4 h-4' />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='bg-white rounded-2xl border border-zinc-200 p-16 text-center'>
                        <div className='w-16 h-16 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center mb-4'>
                            <Grid className='w-8 h-8 text-purple-600' />
                        </div>
                        <h3 className='text-xl font-semibold text-zinc-900 mb-2'>No Logos Yet</h3>
                        <p className='text-zinc-500 mb-6'>Start creating stunning AI-powered logos for your brand</p>
                        <Link href='/create'>
                            <Button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl'>
                                Create Your First Logo
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;