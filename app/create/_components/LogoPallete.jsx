'use client'
import React from 'react'
import Colors from '@/app/_data/Colors'
const LogoPallete = ({ onHandleInputChange, formData }) => {
    const [selected, setseletecd] = React.useState('')
    return (
        <div>
            <h1 className='text-3xl font-semibold text-primary  capitalize'>choose your Color Palete</h1>
            <p className=' font-normal text-gray-500 text-lg mt-4  '>Pick the color that reflects your brands personality and create a lasting impression.</p>
            <div className='flex gap-5 mt-5 justify-center flex-wrap'>
                {Colors?.map((palette) => (
                    <div key={palette.name} className={`border cursor-pointer hover:border-primary transition-all duration-100 ease-linear flex flex-col gap-y-2 p-3 rounded-md shadow ${selected === palette.name ? 'border-primary' : formData.palette === palette.name && 'border-primary' }`} onClick={() => { onHandleInputChange(palette.name), setseletecd(palette.name) }} >
                        <h1>{palette.name}</h1>
                        <div className='flex'>

                            {palette.colors.map((color, id) => (
                                <div key={id} className='size-10 ' style={{ backgroundColor: color }}></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LogoPallete
