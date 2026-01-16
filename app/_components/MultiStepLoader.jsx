'use client'
import React, { useEffect, useState } from 'react'
import { Sparkles, Palette, Wand2, ImageIcon, CheckCircle2, CircleDashed } from 'lucide-react'

const steps = [
    { id: 1, label: 'Analyzing requirements', icon: Sparkles },
    { id: 2, label: 'Generating concepts', icon: Palette },
    { id: 3, label: 'Refining details', icon: Wand2 },
    { id: 4, label: 'Finalizing render', icon: ImageIcon },
]

const MultiStepLoader = ({ isLoading }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!isLoading) {
            setCurrentStep(0)
            setProgress(0)
            return
        }

        const duration = 20000; // 20s total estimate
        const intervalTime = 100;
        const stepsCount = steps.length;
        const stepDuration = duration / stepsCount;

        // Progress bar timer
        const progressTimer = setInterval(() => {
            setProgress(old => {
                if (old >= 95) return 95; // Hold at 95% until complete
                return old + (100 / (duration / intervalTime));
            })
        }, intervalTime);

        // Step switcher
        const stepTimer = setInterval(() => {
            setCurrentStep(old => {
                if (old >= stepsCount - 1) return old;
                return old + 1;
            })
        }, stepDuration);

        return () => {
            clearInterval(progressTimer);
            clearInterval(stepTimer);
        }
    }, [isLoading])

    if (!isLoading) return null

    return (
        <div className='flex flex-col items-center justify-center p-12 min-h-[400px] w-full'>
            <div className='w-full max-w-sm space-y-8'>

                {/* Header */}
                <div className='text-center space-y-2'>
                    <h3 className='text-xl font-semibold text-zinc-900'>Creating your logo</h3>
                    <p className='text-sm text-zinc-500'>Please wait while we generate your unique design.</p>
                </div>

                {/* Steps List */}
                <div className='space-y-4 relative'>
                    {/* Vertical line connecting steps (optional, keeping it simple for now) */}

                    {steps.map((step, index) => {
                        const Icon = step.icon
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div
                                key={step.id}
                                className={`flex items-center gap-4 transition-all duration-500 p-3 rounded-xl border ${isActive
                                        ? 'bg-white border-zinc-200 shadow-sm scale-100 opacity-100'
                                        : isCompleted
                                            ? 'bg-zinc-50/50 border-transparent opacity-60'
                                            : 'bg-transparent border-transparent opacity-40'
                                    }`}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${isActive
                                        ? 'bg-purple-100 text-purple-600'
                                        : isCompleted
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-zinc-100 text-zinc-400'
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircle2 className='w-5 h-5' />
                                    ) : isActive ? (
                                        <Icon className='w-5 h-5 animate-pulse' />
                                    ) : (
                                        <CircleDashed className='w-5 h-5' />
                                    )}
                                </div>
                                <div className='flex-1'>
                                    <p className={`font-medium text-sm transition-colors ${isActive ? 'text-zinc-900' : 'text-zinc-500'
                                        }`}>
                                        {step.label}
                                    </p>
                                    {isActive && (
                                        <div className='h-1 w-full bg-zinc-100 rounded-full mt-2 overflow-hidden'>
                                            <div className='h-full bg-purple-600 animate-[progress_2s_ease-in-out_infinite]' style={{ width: '60%' }}></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    )
}

export default MultiStepLoader
