import React from "react";
import Image from "next/image";
import { InlineWidget } from "react-calendly";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import UserProfile from "../molecules/userProfile";
import { Advisor } from "../../types";

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
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-navy"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to advisors
            </button>

            <div className="bg-white rounded-lg p-6">
              <div className="relative h-80 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={advisor.imageUrl}
                  alt={advisor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mb-8">
                <h1 className="text-2xl font-cirka text-navy mb-2">
                  {advisor.name}
                </h1>
                <p className="text-gray-600 mb-4">{advisor.title}</p>
                <p className="text-gray-700">{advisor.bio}</p>
              </div>

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

              <div className="border-t pt-8">
                <h2 className="text-xl font-cirka text-navy mb-6">
                  Schedule a Virtual Consultation
                </h2>
                <div className="h-[600px]">
                  <InlineWidget
                    url={`https://calendly.com/${advisor.calendlyUrl}/30min`}
                    styles={{ height: "100%", width: "100%" }}
                    pageSettings={{
                      backgroundColor: "ffffff",
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: "000080",
                      textColor: "4d5055",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
