import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Mail, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  userName: string;
  netWorth: number;
  riskAttitude: string;
  investmentExperience: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  netWorth,
  riskAttitude,
  investmentExperience,
}) => {
  const actionItems = [
    {
      icon: "/assets/consultation.svg",
      text: "Book a Virtual Consultation",
      alt: "Consultation",
    },
    {
      icon: "/assets/recommendation.svg",
      text: "View advisors recommendation",
      alt: "Advisor",
    },
    {
      icon: "/assets/financialDoc.svg",
      text: "Upload financial documents",
      alt: "Upload Financial Document",
    },
  ];

  const router = useRouter();

  const handleAdvisors = () => {
    router.push("/advisors");
  };
  // Only render on desktop
  return (
    <Card className="hidden lg:block bg-white rounded-3xl">
      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-cirka text-navy leading-relaxed">
            Hello {userName} welcome to
            <br />
            your Celerey dashboard.
          </h2>
          <div className="relative">
            <Mail className="h-6 w-6 text-gray-400" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
          </div>
        </div>
      </div>

      <div className="space-y-2 p-2 bg-[#FAFBFB]">
        <div className="border-b border-[#AAAAAA] pb-2">
          <div className="text-sm text-gray-500 pl-5 mb-2 font-helvatica">
            Your Risk Attitude
          </div>
          <div className="text-2xl text-navyLight font-cirka pl-5 font-medium">
            {riskAttitude}
          </div>
        </div>

        <div className="border-b border-[#AAAAAA] pb-2">
          <div className="text-sm text-gray-500 pl-5 mb-2 font-helvatica">
            Your Current Net Worth
          </div>
          <div className="text-2xl text-navyLight font-cirka pl-5 font-medium">
            ${netWorth.toLocaleString()}
          </div>
        </div>

        <div className="border-b border-[#AAAAAA] pb-2">
          <div className="text-sm text-gray-500 pl-5 mb-2 font-helvatica">
            Your Investment Experience
          </div>
          <div className="text-2xl text-navyLight font-cirka pl-5 font-medium">
            {investmentExperience}
          </div>
        </div>
      </div>

      <div className="pb-2 bg-[#FAFBFB] rounded-b-3xl p-2 space-y-2">
        {actionItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-[#AAAAAA] p-2 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-navy font-helvatica text-sm">
                {item.text}
              </span>
            </div>
            <button
              onClick={handleAdvisors}
              className="p-2 rounded-full bg-navy flex items-center justify-center"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserProfile;
