"use client";
import React, { useState } from "react";
import Image from "next/image";
import { InlineWidget } from "react-calendly";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import UserProfile from "../molecules/userProfile";
import { Advisor } from "../../types";
import { CALENDLY_CONFIG } from "../../calendly";

interface AdvisorDetailsTemplateProps {
  advisor: Advisor;
  userName: string;
  netWorth: number;
  riskAttitude: string;
  investmentExperience: string;
}

export const AdvisorDetailsTemplate: React.FC<AdvisorDetailsTemplateProps> = ({
  advisor,
  userName,
  netWorth,
  riskAttitude,
  investmentExperience,
}) => {
  const router = useRouter();
  const [isCalendlyLoading, setCalendlyLoading] = useState(true);

  // Function to construct the Calendly URL
  const getCalendlyUrl = (advisor: Advisor) => {
    return `${CALENDLY_CONFIG.baseUrl}/${advisor.calendlyUrl}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - UserProfile */}
          <div className="lg:col-span-4">
            <UserProfile
              userName={userName}
              netWorth={netWorth}
              riskAttitude={riskAttitude}
              investmentExperience={investmentExperience}
            />
          </div>

          {/* Right Column - Advisor Details and Calendly */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl p-8">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-navy"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to advisors
              </button>

              <div className="bg-white rounded-lg p-6">
                {/* Advisor Image */}
                <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={advisor.imageUrl}
                    alt={advisor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Advisor Information */}
                <div className="mb-8">
                  <h1 className="text-2xl font-cirka text-navy mb-2">
                    {advisor.name}
                  </h1>
                  <p className="text-gray-600 mb-4">{advisor.title}</p>
                  <p className="text-gray-700">{advisor.bio}</p>
                </div>

                {/* Specialties and Strengths */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h2 className="text-lg font-cirka text-navy mb-4">
                      {advisor.name}&apos;s Specialties in:
                    </h2>
                    <ul className="space-y-2">
                      {advisor.specialties.map((specialty, index) => (
                        <li key={index} className="text-gray-700">
                          {specialty}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-cirka text-navy mb-4">
                      {advisor.name}&apos;s Strengths:
                    </h2>
                    <ul className="space-y-2">
                      {advisor.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-700">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Calendly Integration */}
                <div className="border-t pt-8">
                  <h2 className="text-xl font-cirka text-navy mb-6">
                    Schedule a Virtual Consultation
                  </h2>
                  <div className="h-[700px] relative">
                    {isCalendlyLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <div className="text-navy">Loading calendar...</div>
                      </div>
                    )}
                    <InlineWidget
                      url={getCalendlyUrl(advisor)}
                      styles={{
                        height: "100%",
                        width: "100%",
                      }}
                      prefill={{
                        email: "desmondgoldsmith07@gmail.com",
                        firstName: userName,
                        lastName: "",
                        name: userName,
                      }}
                      pageSettings={CALENDLY_CONFIG.settings}
                      onReady={() => setCalendlyLoading(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
