"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logotitle from "./_components/Logotitle";
import LogoDesc from "./_components/LogoDesc";
import LogoPallete from "./_components/LogoPallete";
import LogoStyle from "./_components/LogoStyle";
import { PricingForLogo } from "./_components/PricingForLogo";
import { useDispatch, useSelector } from "react-redux"; // Import from react-redux
import { FormDataCollection, setFormDataCollection } from "../_store/DataSlice"; // Ensure this path is correct
import LogoIdea from "./_components/LogoIdea";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Page = () => {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams?.get("title") ?? "");
  const userid = useSelector((state) => state.DataForm.AuthUserDetails.id);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ title: title ?? "" });
  const dispatch = useDispatch(); // Use useDispatch from react-redux
  const { user } = useUser()
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 5) {
      dispatch(setFormDataCollection(formData)); // Dispatch form data to Redux store
      setStep(step + 1);
    }

    setStep(step + 1);
  };

  return (
    <div className="my-10 border rounded-xl bg-white shadow-md p-10 2xl:mx-72">
      {step === 1 ? (
        <Logotitle
          title={title}
          onHandleInputChange={(value) => onHandleInputChange("title", value)}
        />
      ) : step === 2 ? (
        <LogoDesc
          formData={formData}
          onHandleInputChange={(value) => onHandleInputChange("description", value)}
        />
      ) : step === 3 ? (
        <LogoPallete
          formData={formData}
          onHandleInputChange={(v) => onHandleInputChange("palette", v)}
        />
      ) : step === 4 ? (
        <LogoStyle
          formData={formData}
          onHandleInputChange={(v) => onHandleInputChange("Design", v)}
        />
      ) : step === 5 && (<LogoIdea
        formData={formData}
        onHandleInputChange={(v) => onHandleInputChange("idea", v)}
      />)}
      
      <div className="w-full flex items-center justify-between mt-10">
        {step !== 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft /> Previous
          </Button>
        )}
        {step !== 5 ? <Button onClick={handleNextStep} >
          <ArrowRight />Continue
        </Button>
          :
          user ? (
            <Link href={`generate-logo`}><Button className='mt-5' onClick={handleNextStep}>Generate Logo</Button></Link>
          ) : (
            <SignInButton mode='modal' forceRedirectUrl={`generate-logo`}>
              <Button className='mt-5' onClick={handleNextStep}>Generate Logo</Button>
            </SignInButton>
          )
          }
        
      </div>
    </div >
  );
};

export default Page; 