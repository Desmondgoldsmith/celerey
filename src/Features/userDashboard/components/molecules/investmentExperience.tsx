import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface InvestmentExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuidingPrinciple {
  title: string;
  description: string;
}

const InvestmentExperienceModal: React.FC<InvestmentExperienceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const guidingPrinciples: GuidingPrinciple[] = [
    {
      title: "Trade ideas",
      description:
        "We have a team of financial experts and analysts who can assist you with trade ideas. Although this would not be foolproof, you could assess them and tweak them to your preference. We can provide ideas in commodities, forex, and derivatives.",
    },
    {
      title: "Account and Asset Management",
      description:
        "With your permission, we could also help you grow your portfolio by managing some of your accounts in areas you would need our expertise on. These areas include futures, CFDs, and factors of the different countries you are interested in.",
    },
  ];
  
  const router = useRouter();
  const handleAdvisors = () => {
    router.push("/advisors");
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-center text-3xl font-cirka font-normal">
            Investment Experience Report
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6">
          <div className="text-center mb-4">
            <h3 className="text-sm font-normal  mb-2">
              Investment Experience Summary
            </h3>
            <p className="text-lg text-orange-600 font-normal mb-4">Advanced</p>

            <div className="w-40 h-40 mx-auto mb-4">
              <Image
                src="/assets/invest.svg"
                alt="Risk attitude illustration"
                width={80}
                height={80}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Assessment Description */}
          <div className="relative pl-6 mb-6">
            <div className="absolute left-0 top-0 h-full w-1 bg-orange-600" />
            <p className="text-gray-700 text-sm">
              The assessment indicates that your investment experience is
              <span className="font-bold">advanced</span>. This means you have a
              strong understanding of how financial instruments and assets work.
              You have also in the past invested in a couple of active and
              passive investments to know enough of what you need to pay
              attention to
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-center mb-3">
              Key Areas We Can Help With
            </h4>
            <div className="space-y-3">
              {guidingPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="flex items-center items-start gap-3"
                >
                  <Image
                    src="/assets/tick.png"
                    alt="tick"
                    width={20}
                    height={20}
                  />
                  <div>
                    <span className="font-semibold text-medium">
                      {principle.title}
                    </span>
                    {" - "}
                    <span className="text-gray-700 text-sm">
                      {principle.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t">
          <div className="flex justify-between gap-4 w-full sm:justify-center">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              onClick={handleAdvisors}
              className="flex-1 sm:flex-none bg-navy hover:bg-navyLight"
            >
              Talk With Advisor
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentExperienceModal;
