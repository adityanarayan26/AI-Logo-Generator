import React from 'react'

const Logotitle = ({ title, onHandleInputChange }) => {
    return (
        <div>
            <h1 className='text-3xl font-semibold text-primary '>Logotitle</h1>
            <p className=' font-normal text-gray-500 text-lg mt-4  '>Add your business ,app,website name for a custom logo</p>
            <input type="text" placeholder='enter your logo name' className='capitalize border rounded-lg p-4 mt-4 w-full outline-none' defaultValue={title} onChange={(e) => onHandleInputChange(e.target.value)} />
        </div >
    )
}

export default Logotitle