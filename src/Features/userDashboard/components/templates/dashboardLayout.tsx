"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UserCircle, Menu, ChevronDown, X } from "lucide-react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Navigation Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto md:hidden">
          <div className="p-6">
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            <div className="space-y-6 pt-12">
              <Link
                href="#"
                className="block text-lg font-helvetica text-gray-700 py-3 border-b"
                onClick={() => setIsMobileNavOpen(false)}
              >
                Risk Allocation
              </Link>
              <Link
                href="#"
                className="block text-lg font-helvetica text-gray-700 py-3 border-b"
                onClick={() => setIsMobileNavOpen(false)}
              >
                Goals & Planning
              </Link>
              <Link
                href="#"
                className="block text-lg font-helvetica text-gray-700 py-3 border-b"
                onClick={() => setIsMobileNavOpen(false)}
              >
                Knowledge Hub
              </Link>
            </div>
          </div>
        </div>
      )}

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
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="h-6 w-6 text-navy" />
            </button>
            <UserCircle className="h-8 w-8 text-navy cursor-pointer" />
          </div>
        </div>
      </nav>
      <div className="flex-grow bg-gray-100">
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
