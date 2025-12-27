'use client'
import axios from 'axios';
import { Download, Loader2, Grid, List, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Page = () => {
    const userDetails = useSelector((state) => state.DataForm.AuthUserDetails);
    const FormDataCollection = useSelector((state) => state.DataForm.FormDataCollection);
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

    const handleDownload = (base64Image, index) => {
        const byteString = atob(base64Image.split(',')[1]);
        const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        saveAs(blob, `logo-${index + 1}.png`);
    };

    return (
        <div className='min-h-screen py-10'>
            {/* Header Section */}
            <div className='mb-10'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div>
                        <h1 className='text-4xl font-bold'>
                            Welcome back, <span className='text-gradient'>{userDetails?.fullname || 'Creator'}</span>
                        </h1>
                        <p className='text-gray-400 mt-2'>Manage and download your generated logos</p>
                    </div>
                    <Link href='/create'>
                        <Button className='btn-primary'>
                            Create New Logo
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-10'>
                <div className='glass-card rounded-2xl p-6'>
                    <p className='text-gray-400 text-sm'>Total Logos</p>
                    <p className='text-3xl font-bold text-white mt-1'>{Logos.length}</p>
                </div>
                <div className='glass-card rounded-2xl p-6'>
                    <p className='text-gray-400 text-sm'>This Month</p>
                    <p className='text-3xl font-bold text-white mt-1'>{Logos.length}</p>
                </div>
                <div className='glass-card rounded-2xl p-6'>
                    <p className='text-gray-400 text-sm'>Downloads</p>
                    <p className='text-3xl font-bold text-white mt-1'>∞</p>
                </div>
            </div>

            {/* Gallery Header */}
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
                <h2 className='text-2xl font-bold text-white'>Your Logos</h2>
                <div className='flex items-center gap-3'>
                    {/* Search */}
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                            type='text'
                            placeholder='Search logos...'
                            className='input-premium pl-10 py-2 w-48'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {/* View Toggle */}
                    <div className='flex items-center gap-1 glass-card rounded-xl p-1'>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Grid className='w-4 h-4' />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <List className='w-4 h-4' />
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery */}
            {loading ? (
                <div className='flex flex-col items-center justify-center py-20'>
                    <Loader2 className='w-10 h-10 text-purple-500 animate-spin' />
                    <p className='text-gray-400 mt-4'>Loading your logos...</p>
                </div>
            ) : Logos.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
                    {Logos.map((item, index) => (
                        <div key={index} className='logo-card group'>
                            <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'h-40'}`}>
                                <Image
                                    src={item?.base64Image}
                                    fill
                                    alt={`Logo ${index + 1}`}
                                    className='object-cover rounded-2xl'
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-4'>
                                    <button
                                        onClick={() => handleDownload(item?.base64Image, index)}
                                        className='flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors'
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
                <div className='glass-card rounded-3xl p-16 text-center'>
                    <div className='w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6'>
                        <Grid className='w-10 h-10 text-purple-400' />
                    </div>
                    <h3 className='text-2xl font-bold text-white mb-2'>No Logos Yet</h3>
                    <p className='text-gray-400 mb-6'>Start creating stunning AI-powered logos for your brand</p>
                    <Link href='/create'>
                        <Button className='btn-primary'>
                            Create Your First Logo
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Page;