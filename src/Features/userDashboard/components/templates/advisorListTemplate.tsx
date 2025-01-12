"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserProfile from "../molecules/userProfile";
import { DUMMY_ADVISORS } from "../../constants";

interface AdvisorsListTemplateProps {
  userName: string;
  netWorth: number;
  riskAttitude: string;
  investmentExperience: string;
}

export const AdvisorsListTemplate: React.FC<AdvisorsListTemplateProps> = ({
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

          {/* Right Column - Advisors List */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-cirka text-navy mb-4">
                Our expert panel of advisors
              </h2>
              <p className="text-gray-600 mb-8">
                Book free 30-minute video consultations with a professional
                advisor who&apos;ll help you achieve your financial goals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DUMMY_ADVISORS.map((advisor) => (
                  <div
                    key={advisor.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative h-64">
                      <Image
                        src={advisor.imageUrl}
                        alt={advisor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-cirka text-navy mb-1">
                        {advisor.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{advisor.title}</p>
                      <p className="text-gray-700 text-sm mb-6 line-clamp-3">
                        {advisor.bio}
                      </p>
                      <button
                        onClick={() => router.push(`/advisors/${advisor.id}`)}
                        className="w-full bg-navy hover:bg-navy/90 text-white rounded-full py-3"
                      >
                        Book a call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
