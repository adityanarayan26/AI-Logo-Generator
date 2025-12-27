'use client';
import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ fullScreen = true, message = 'Loading...' }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b]/80 backdrop-blur-sm">
                <div className="flex flex-col items-center p-8 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-200">
                    <Loader2 className="w-10 h-10 text-white animate-spin mb-4" />
                    <p className="text-zinc-400 text-sm font-medium animate-pulse">{message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </div>
    );
};

export default Loading;
