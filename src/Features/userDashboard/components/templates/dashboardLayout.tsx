"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { UserCircle, Menu, ChevronDown, X, LogOut, User } from "lucide-react";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const UserDropdownMenu = () => (
    <div className="bg-white rounded-md shadow-lg py-2 w-48">
      <Link
        href="/profile"
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <User className="h-4 w-4 mr-2" />
        Edit Profile
      </Link>
      <button
        onClick={() => {/*  logout logic  */}}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  );

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
              {/* <Link
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
              </Link> */}
              {/* Mobile User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center w-full py-3 border-b"
                >
                  <UserCircle className="h-8 w-8 text-navy" />
                  <ChevronDown className={`ml-2 h-4 w-4 text-gray-600 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isUserDropdownOpen && (
                  <div className="mt-2" ref={dropdownRef}>
                    <UserDropdownMenu />
                  </div>
                )}
              </div>
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
            {/* <Link href="#" className="text-sm font-helvetica text-gray-600">
              Risk Allocation
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Goals & Planning
            </Link>
            <Link href="#" className="text-sm font-helvetica text-gray-600">
              Knowledge Hub
            </Link> */}
            {/* Desktop User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center"
              >
                <UserCircle className="h-8 w-8 text-navy cursor-pointer" />
                <ChevronDown className={`ml-1 h-4 w-4 text-gray-600 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 z-50">
                  <UserDropdownMenu />
                </div>
              )}
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsMobileNavOpen(true)}>
              <Menu className="h-6 w-6 text-navy" />
            </button>
            {/* Mobile User Button */}
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center"
              >
                <UserCircle className="h-8 w-8 text-navy cursor-pointer" />
                <ChevronDown className={`ml-1 h-4 w-4 text-gray-600 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 z-50" ref={dropdownRef}>
                  <UserDropdownMenu />
                </div>
              )}
            </div>
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