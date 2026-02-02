"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
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
import Header from "../_components/Header";

const steps = [
  { id: 1, name: 'Brand Name' },
  { id: 2, name: 'Description' },
  { id: 3, name: 'Palette' },
  { id: 4, name: 'Aesthetic' },
  { id: 5, name: 'Concept' },
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
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-12">

        {/* Left: Stepper (Desktop) */}
        <div className="hidden md:block w-64 shrink-0 space-y-8">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm sticky top-32">
            <h3 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" /> Creation Steps
            </h3>
            <div className="relative space-y-0">
              {/* Connecting Line */}
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-zinc-100 -z-10"></div>

              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center gap-4 py-3 relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white transition-all duration-300 ${step > s.id
                      ? 'bg-purple-600 text-white'
                      : step === s.id
                        ? 'bg-white border-2 border-purple-600 text-purple-600'
                        : 'bg-zinc-100 text-zinc-400 border-2 border-transparent'
                    }`}>
                    {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${step === s.id ? 'text-zinc-900' : 'text-zinc-500'
                    }`}>
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top: Stepper (Mobile) */}
        <div className="md:hidden flex items-center justify-between mb-8 overflow-x-auto pb-4">
          {steps.map((s) => (
            <div key={s.id} className={`flex flex-col items-center gap-2 min-w-[70px] ${step === s.id ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s.id ? 'bg-purple-600 text-white' : 'bg-zinc-200 text-zinc-500'
                }`}>
                {s.id}
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wide">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Right: Content Card */}
        <div className="flex-1 max-w-3xl">
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl shadow-zinc-200/50 overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-8 md:p-12 flex-1 relative">
              <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

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

            {/* Footer Navigation */}
            <div className="bg-zinc-50/50 backdrop-blur-sm border-t border-zinc-100 p-6 md:px-12 md:py-8 flex items-center justify-between">
              {step !== 1 ? (
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 h-12 px-6 rounded-xl font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              ) : (
                <div></div>
              )}

              {step !== 5 ? (
                <Button
                  onClick={handleNextStep}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white h-12 pl-8 pr-6 rounded-xl font-medium shadow-lg shadow-zinc-900/10 hover:shadow-zinc-900/20 hover:-translate-y-0.5 transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : user ? (
                <Link href="/generate-logo">
                  <Button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-12 pl-8 pr-6 rounded-xl font-medium shadow-lg shadow-purple-600/20 hover:shadow-purple-600/30 hover:-translate-y-0.5 transition-all"
                  >
                    Generate Logo <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleSignIn}
                  className="bg-black text-white h-12 px-8 rounded-xl font-medium shadow-lg"
                >
                  Sign In to Generate <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;