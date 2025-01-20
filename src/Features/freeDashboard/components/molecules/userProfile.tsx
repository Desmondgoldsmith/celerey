import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  userName: string;
  netWorth: number;
  riskAttitude: string;
  investmentExperience: string;
  profileCompletion?: number;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  netWorth,
  riskAttitude,
  investmentExperience,
  profileCompletion,
}) => {
  const router = useRouter();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="bg-white p-6 space-y-4">
      {/* Account Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-medium ">Free Account</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1.5V3M8 13V14.5M3 8H1.5M14.5 8H13M12.5 3.5L11.5 4.5M4.5 11.5L3.5 12.5M3.5 3.5L4.5 4.5M11.5 11.5L12.5 12.5M11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8Z"
              stroke="#98A2B3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <button className="text-[#6938EF] text-sm font-medium hover:underline">
          Upgrade to Pro
        </button>
      </div>

      {/* Welcome Section */}
      <div className="space-y-1">
        <h1 className="text-3xl font-medium font-cirka">Welcome {userName}</h1>
        <p className="text-gray-600 mt-2 text-small font-cirka">
          {currentDate}
        </p>
        <p className="text-gray-700 mt-2 font-helvatica text-medium">
          We&apos;re happy to see you again. Here&apos;s is a quick overview of
          your finances.
        </p>
      </div>

      {/* Profile Completion */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium text-xl">
            Profile Completion
          </span>
          <span className="text-gray-600 bg-gray-100 p-1 text-sm">
            You&apos;re almost there!
          </span>
        </div>
        <span className="text-3xl font-medium">{profileCompletion}%</span>
        <div className="relative h-2 bg-[#EBE9FE] rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-[#281FBB] rounded-full"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[#E15B2D] text-white px-4 py-2 rounded-md text-sm hover:bg-[#E63D04] transition-colors">
            Complete Profile
          </button>
        </div>
      </div>

      {/* Financial Info */}
      <div className="space-y-2 ">
        <div className="pt-2 border-b border-t border-[#AAAAAA]">
          <div className="p-3">
            <p className="text-gray-600">Your Risk Attitude</p>
            <p className="text-2xl font-medium font-cirka">{riskAttitude}</p>
          </div>
        </div>
        <div className=" border-b  border-[#AAAAAA]">
          <div className="p-3">
            <p className="text-gray-600">Your Current Net Worth</p>
            <p className="text-2xl font-medium font-cirka">
              ${netWorth.toLocaleString()}
            </p>
          </div>
        </div>
        <div className=" border-b border-[#AAAAAA]">
          <div className="p-3">
            <p className="text-gray-600">Your Investment Experience</p>
            <p className="text-2xl font-medium font-cirka">
              {investmentExperience}
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Button */}
      <div className="flex items-center justify-between bg-gray-50  rounded-lg mt-6">
        <div className="flex items-center p-4 gap-4">
          <div className="flex-shrink-0">
            <Image
              src="/assets/consultation.svg"
              alt="Consultation"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>
          <span className="font-medium">Book 15 Minutes Consultation</span>
        </div>
        <button className="p-2 rounded-full bg-[#1E1B4B] hover:bg-[#2D2A5C] transition-colors">
          <ChevronRight className="h-5 w-5 text-white" />
        </button>
      </div>
    </Card>
  );
};

export default UserProfile;
