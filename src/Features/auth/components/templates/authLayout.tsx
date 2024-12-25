import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-6 py-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="w-32">
            <Image
              src="/assets/logo2.svg"
              alt="Celerey"
              width={80}
              height={30}
              priority
            />
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm font-helvetica text-gray-600">
              Tax Calculator
            </a>
            <a href="#" className="text-sm font-helvetica text-gray-600">
              Goals & Planning
            </a>
            <a href="#" className="text-sm font-helvetica text-gray-600">
              Knowledge Hub
            </a>
          </div>
        </div>
      </nav>
      <div className="flex-grow bg-offWhite">
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
      </div>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-helvetica text-gray-500">
            © Celerey 2024
          </span>
          <div className="flex gap-4">
            <a href="#" className="text-sm font-helvetica text-gray-500">
              Help
            </a>
            <a href="#" className="text-sm font-helvetica text-gray-500">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
