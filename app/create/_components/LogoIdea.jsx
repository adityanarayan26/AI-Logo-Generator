'use client'
import Prompt from '@/app/_data/Prompt'
import axios from 'axios'
import { LoaderIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const LogoIdea = ({ onHandleInputChange, formData }) => {
    const formdata = useSelector(state => state.DataForm.FormDataCollection)
    const [ideas, setideas] = useState()
    const [loading, setloading] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    useEffect(() => {
        if (formdata) {
            generateLogoIdeas()
        }
    }, [formdata])
    const generateLogoIdeas = async () => {
        setloading(true)
        const PROMPT = Prompt.DESIGN_IDEA_PROMPT
            .replace('{logoType}', formdata?.Design?.design)
            .replace('{logoTitle}', formdata?.title)
            .replace('{logoDesc}', formdata?.description)
            .replace('{logoPrompt}', formdata?.Design?.prompt)
     
        const result = await axios.post('/api/auth/ai-design-ideas', { prompt: PROMPT })
        setideas(result.data.logo_ideas);
        setloading(false)

    }
    return (
        <div>
            <h1 className='text-primary text-3xl capitalize font-bold'>Select Your Design Idea</h1>
            <p className='text-lg capitalize'>Choose a design style that aligns with your vision, or skip to receive a random suggestion.</p>
            {loading ? <div className='flex size-full  justify-center items-center'><LoaderIcon className='animate-spin text-gray-500 size-5' /></div> : <div className='flex gap-5 items-center justify-center flex-wrap pt-10'>
                {ideas && ideas?.map((item, index) => (
                    <div key={index} className='flex  justify-center'>
                        <div className={`border select-none cursor-pointer    p-8 rounded-xl hover:border-primary max-w-52 justify-center  flex items-center flex-col gap-y-2 ${selectedItem==item.idea && 'border-primary'}`} onClick={() => { setSelectedItem(item?.idea); onHandleInputChange(item?.idea) }}>
                            <h1>{item?.idea}</h1>
                        </div>
                    </div>
                ))}
                <div className={`border select-none cursor-pointer p-8 rounded-xl hover:border-primary max-w-52 justify-center  flex items-center flex-col gap-y-2 ${selectedItem==='let ai select the best idea'&& "border-primary"}`} onClick={() =>{ setSelectedItem('let ai select the best idea'); onHandleInputChange("let ai select the best idea")}}>
                    <h1 className='capitalize'>let ai select the best idea</h1>
                </div>
            </div>}
        </div>
    )
}

export default LogoIdea