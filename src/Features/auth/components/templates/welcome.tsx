import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className="max-w-4xl mx-auto text-center ">
      <div className="flex justify-center mb-6">
        <Image
          src="/assets/logo1.svg"
          alt="Celerey Logo"
          width={80}
          height={30}
        />
      </div>
      <div className="mb-4">
        <h1 className="text-4xl font-cirka font-light mb-2">
          Welcome to Celerey
        </h1>
        <p className="text-gray-600 font-helvetica">
          Celerey is the easiest way to make informed decisions about your
          wealth.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-64 h-64">
          <Image
            src="/assets/SignupImage.svg"
            alt="Financial Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl mb-2 font-helvetica font-normal">
          Your path to financial concierge
        </h2>
        <p className="text-gray-600 font-helvetica">
          Celerey is the easiest way to make informed decisions about your
          wealth
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/auth/signin" passHref>
          <Button variant="outline" className="outline-navy text-navy">
            Sign in to my account
          </Button>
        </Link>
        <Button className="bg-navy text-white hover:bg-navyLight">
          Create an account
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
