import React from "react";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
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
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Risk Allocation
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Goals & Planning
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Knowledge Hub
            </Link>
            <UserCircle className="h-8 w-8 text-navy cursor-pointer" />
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <UserCircle className="h-8 w-8 text-navy cursor-pointer" />
          </div>
        </div>
      </nav>
      <div className="flex-grow bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>
      </div>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-helvetica text-gray-500">
            © Celerey 2025
          </span>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-helvetica text-gray-500">
              Help
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-500">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
