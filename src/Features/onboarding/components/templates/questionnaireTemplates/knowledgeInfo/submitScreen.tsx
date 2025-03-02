import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SubmitScreen: React.FC = () => {
  const router = useRouter();

  const handleReturnToDashboard = () => {
    router.push("/dashboard");
  };
  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-xl p-20 text-center max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4 font-cirka">
          Knowledge Assessment Complete
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Congratulations! <br />
          You have successfully completed the knowledge assessment.
        </p>
                 <Button
                   onClick={handleReturnToDashboard}
                   className="bg-navy hover:bg-navyLight text-white px-6 py-3 rounded-lg transition-all duration-300"
                 >
                   Return to Dashboard
                 </Button>
               </div>
             </div>
           );
         };

export { SubmitScreen };
