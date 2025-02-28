import React from 'react'

const LogoDesc = ({onHandleInputChange,formData}) => {
    return (
        <div>
            <h1 className='text-3xl font-semibold text-primary capitalize '>describe your logo vision</h1>
            <p className=' font-normal text-gray-500 text-lg mt-4  '>Share your idea ,theme or inspiration to create a logo that perfectly represents your brand or project</p>
            <input type="text" placeholder='logo description' defaultValue={formData?.description} className='capitalize border rounded-lg p-4 mt-4 w-full outline-none' onChange={(e) => onHandleInputChange(e.target.value)}/>
        </div>
    )
}

export default LogoDesc
