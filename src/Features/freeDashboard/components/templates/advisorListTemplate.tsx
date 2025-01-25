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
    <div className="min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6">
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
            <div className="bg-white rounded-xl p-8">
              {/* Header and Filter Section */}
              <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-8">
                <div className="max-w-2xl">
                  <h1 className="text-3xl font-cirka text-navy mb-3">
                    Our expert panel of advisors
                  </h1>
                  <p className="text-gray-600">
                    Enjoy four 15-minute virtual consultations with a
                    professional advisor each year, ensuring you receive
                    personalised advice and support.
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Filter"
                    className="px-4 py-2 border border-gray-200 rounded-lg w-48 focus:outline-none focus:ring-1 focus:ring-navy"
                  />
                </div>
              </div>

              {/* Advisors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DUMMY_ADVISORS.map((advisor) => (
                  <div
                    key={advisor.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={advisor.imageUrl}
                        alt={advisor.name}
                        fill
                        className="object-cover object-center"
                        priority
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-cirka text-navy mb-1">
                        {advisor.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {advisor.title}
                      </p>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                        {advisor.bio}
                      </p>
                      <button
                        onClick={() =>
                          router.push(`/freebie-account/advisors/${advisor.id}`)
                        }
                        className="w-full bg-[#28134B] hover:bg-[#28134B]/90 text-white rounded-full py-2 text-sm font-medium"
                      >
                        Book A Call
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
