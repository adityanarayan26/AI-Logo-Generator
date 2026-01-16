"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Logotitle from "./_components/Logotitle";
import LogoDesc from "./_components/LogoDesc";
import LogoPallete from "./_components/LogoPallete";
import LogoStyle from "./_components/LogoStyle";
import { useDispatch } from "react-redux";
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
    <div className="min-h-screen bg-zinc-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm pt-6 pb-12 px-8 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${step > s.id
                    ? 'bg-green-500 text-white'
                    : step === s.id
                      ? 'bg-purple-600 text-white ring-4 ring-purple-100'
                      : 'bg-zinc-100 text-zinc-400'
                    }`}>
                    {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                  </div>
                  <span className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap ${step >= s.id ? 'text-zinc-900' : 'text-zinc-400'
                    }`}>
                    {s.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 rounded-full transition-colors ${step > s.id ? 'bg-green-500' : 'bg-zinc-200'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm mt-12">
          <div className="p-8">
            {step === 1 && (
              <Logotitle
                title={title}
                onHandleInputChange={(value) => onHandleInputChange("title", value)}
              />
            )}
            {step === 2 && (
              <LogoDesc
                formData={formData}
                onHandleInputChange={(value) => onHandleInputChange("description", value)}
              />
            )}
            {step === 3 && (
              <LogoPallete
                formData={formData}
                onHandleInputChange={(v) => onHandleInputChange("palette", v)}
              />
            )}
            {step === 4 && (
              <LogoStyle
                formData={formData}
                onHandleInputChange={(v) => onHandleInputChange("Design", v)}
              />
            )}
            {step === 5 && (
              <LogoIdea
                formData={formData}
                onHandleInputChange={(v) => onHandleInputChange("idea", v)}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-6 border-t border-zinc-100 bg-zinc-50 rounded-b-2xl">
            {step !== 1 ? (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </Button>
            ) : (
              <div />
            )}

            {step !== 5 ? (
              <Button onClick={handleNextStep} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : user ? (
              <Link href="/generate-logo">
                <Button onClick={handleNextStep} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl">
                  Generate Logo <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button onClick={handleSignIn} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl">
                Sign In to Generate <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;