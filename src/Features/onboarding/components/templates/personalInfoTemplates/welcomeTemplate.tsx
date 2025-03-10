import { Button } from "@/components/ui/button";

export const WelcomeTemplate = ({ onStart }: { onStart: () => void }) => (
  <div className="text-center max-w-xl mx-auto my-auto">
    <h1 className="text-4xl font-cirka mb-6">Welcome to Celerey</h1>
    <p className="text-gray-600 mb-12 font-helvetica text-sm">
      To provide tailored financial advice, we need a few key details about you
      and your financial situation.
    </p>
    <Button
      onClick={onStart}
      className="md:w-[380px] w-full bg-navy text-white hover:bg-navyLight px-8"
    >
      Let&apos;s Get Started
    </Button>
  </div>
);
