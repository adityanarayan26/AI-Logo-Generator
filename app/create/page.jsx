"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logotitle from "./_components/Logotitle";
import LogoDesc from "./_components/LogoDesc";
import LogoPallete from "./_components/LogoPallete";
import LogoStyle from "./_components/LogoStyle";
import { useDispatch, useSelector } from "react-redux";
import { setFormDataCollection } from "../_store/DataSlice";
import LogoIdea from "./_components/LogoIdea";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

const steps = [
  { id: 1, name: 'Brand Name' },
  { id: 2, name: 'Description' },
  { id: 3, name: 'Colors' },
  { id: 4, name: 'Style' },
  { id: 5, name: 'Idea' },
];

const Page = () => {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState(searchParams?.get("title") ?? "");
  const userid = useSelector((state) => state.DataForm.AuthUserDetails?.id);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ title: title ?? "" });
  const dispatch = useDispatch();
  const { user, signInWithGoogle } = useAuth();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 5) {
      dispatch(setFormDataCollection(formData));
    }
    setStep(step + 1);
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="min-h-screen py-10">
      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className={`relative flex items-center justify-center`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${step > s.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : step === s.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white ring-4 ring-purple-500/30'
                      : 'bg-white/10 text-gray-400'
                  }`}>
                  {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                </div>
                <span className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap ${step >= s.id ? 'text-white' : 'text-gray-500'
                  }`}>
                  {s.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 sm:w-24 lg:w-32 h-1 mx-2 rounded-full transition-all duration-300 ${step > s.id ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-white/10'
                  }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="glass-card rounded-3xl p-8 lg:p-12">
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
          ) : step === 5 && (
            <LogoIdea
              formData={formData}
              onHandleInputChange={(v) => onHandleInputChange("idea", v)}
            />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
            {step !== 1 && (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </Button>
            )}
            {step === 1 && <div />}

            {step !== 5 ? (
              <Button onClick={handleNextStep} className="btn-primary flex items-center gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : user ? (
              <Link href="/generate-logo">
                <Button onClick={handleNextStep} className="btn-primary flex items-center gap-2">
                  Generate Logo <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Button onClick={handleSignIn} className="btn-primary flex items-center gap-2">
                Sign In to Generate <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;