import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import formatCurrency from "@/utils/formatCurrency";
// import { useRouter } from "next/navigation";

interface UserProfileProps {
  userName: string;
  netWorth: number;
  riskAttitude: string;
  investmentExperience: string;
  profileCompletion?: number;
  bookCall?: () => void;
  onUpgradeClick?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  netWorth,
  riskAttitude,
  investmentExperience,
  profileCompletion,
  onUpgradeClick,
  bookCall,
}) => {
  // const router = useRouter();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="hidden lg:block">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-1">
            <span className="text-gray-900 font-bold text-sm">
              Free Account
            </span>
            <Info className="h-3 w-3 text-gray-400" />
          </div>
          <div className="flex justify-end shrink-0 pl-3">
            <button
              onClick={onUpgradeClick}
              className="flex items-center p-1 border border-navy text-navy bg-white rounded text-xs"
            >
              <span>upgrade</span>
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="space-y-0.5 mb-4">
          <p className="text-gray-600 text-sm font-cirka mb-2">{currentDate}</p>
          <h1 className="text-2xl mb-2 font-medium font-cirka">
            Welcome {userName}
          </h1>

          {/* <p className="text-gray-700 text-xs font-helvatica">
            We&apos;re happy to see you again. Here&apos;s is a quick overview
            of your finances.
          </p> */}
        </div>

        {/* Profile Completion */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium text-sm">
              Profile Completion
            </span>
            <span className="text-gray-600 rounded-sm p-1 bg-gray-100 text-xs">
              You&apos;re almost there!
            </span>
          </div>
          <span className="text-xl font-medium">{profileCompletion}%</span>
          <div className="relative h-1.5 bg-[#EBE9FE] rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-[#281FBB] rounded-full"
              style={{ width: `${profileCompletion}%` }}
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={onUpgradeClick}
              className="bg-navy text-white px-3 py-1 rounded text-xs hover:bg-navyLight transition-colors"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>

      {/* Financial Info */}
      <div className="space-y-1 p-1 bg-[#FAFBFB]">
        <div className="border-b py-5 border-[#AAAAAA] pb-1">
          <div className="text-xs text-gray-500 pl-3 mb-1 font-helvatica">
            Your Risk Attitude
          </div>
          <div className="flex justify-between items-start">
            <div className="text-sm text-black font-cirka pl-3 font-medium capitalize flex-1 break-words">
              {/* {riskAttitude} */}
              Incomplete
            </div>
            <div className="flex justify-end shrink-0 mr-1 pl-3">
              <button
                onClick={onUpgradeClick}
                className="flex items-center p-1 border border-navy text-white bg-navy rounded text-xs"
              >
                <span>Complete Assesment</span>
              </button>
            </div>
          </div>
        </div>
        <div className="border-b py-5 border-[#AAAAAA] pb-1">
          <div className="text-xs text-gray-500 pl-3 mb-1 font-helvatica">
            Financial Knowledge Assesment
          </div>
          <div className="flex justify-between items-start">
            <div className="text-sm text-black font-cirka pl-3 font-medium capitalize flex-1 break-words">
              Incomplete
            </div>
            <div className="flex justify-end shrink-0 mr-1 pl-3">
              <button
                onClick={onUpgradeClick}
                className="flex items-center p-1 border border-navy text-white bg-navy rounded text-xs"
              >
                <span>Complete Assesment</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b py-5 border-[#AAAAAA] pb-1">
          <div className="text-xs text-gray-500 pl-3 mb-1 font-helvatica">
            Your Estimated Net Worth
          </div>
          <div className="text-lg text-navyLight font-cirka pl-3 font-medium">
            {formatCurrency(netWorth.toString(), "usd")}
          </div>
        </div>

        <div className="border-b py-5 border-[#AAAAAA]">
          <div className="text-xs text-gray-500 pl-3 mb-1 font-helvatica">
            Your Investment Experience
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-black font-cirka pl-3 font-medium capitalize">
              {/* {investmentExperience} */}
              Incomplete
            </div>
            <div className="flex mb-2 mr-1 justify-end shrink-0 pl-3">
              <button
                onClick={onUpgradeClick}
                className="flex items-center p-1 border border-navy text-white bg-navy rounded text-xs"
              >
                <span>Complete Assesment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Button */}
      <div className="space-y-1 py-3 rounded-xl bg-gray-50">
        <div className="flex px-2 items-center justify-between rounded-lg">
          <div className="flex items-center p-1 gap-2">
            <div className="flex-shrink-0">
              <Image
                src="/assets/consultation.svg"
                alt="Consultation"
                width={62}
                height={62}
                className="w-16 h-16"
              />
            </div>
            <span className="font-medium text-xs">
              Book 15 Minutes Consultation
            </span>
          </div>
          <button
            onClick={bookCall}
            className="p-1 rounded-full bg-[#1E1B4B] hover:bg-[#2D2A5C] transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </button>
        </div>
        {/* Bottom Border */}
        <div className=" bg-gray-50  p-2" />
      </div>
    </Card>
  );
};

export default UserProfile;
