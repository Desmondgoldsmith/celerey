"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, LogOut, Menu, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/Features/auth/state";
import { useOnboardingStore } from "@/Features/onboarding/state";
import { useDashboardStore } from "@/Features/userDashboard/state";
import { useRouter } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const { logout } = useAuthStore();
  const { resetOnboarding } = useOnboardingStore();
  const { reset } = useDashboardStore();
  const router = useRouter();

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }

      // For mobile nav - close when clicking outside
      if (
        isMobileNavOpen &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(
          'button[aria-label="Toggle mobile menu"]'
        )
      ) {
        setIsMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileNavOpen]);

  // Prevent body scrolling when mobile nav is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  // User dropdown menu component
  const UserDropdownMenu = () => (
    <div
      className="bg-white rounded-md shadow-lg py-2 w-48"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => {
          /*  logout logic  */
          reset();
          resetOnboarding();
          logout();
          router.replace("/auth/signin");
        }}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </button>
    </div>
  );

  // Handle logout for mobile
  const handleLogout = () => {
    reset();
    resetOnboarding();
    logout();
    router.replace("/auth/signin");
    setIsMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="px-10 py-4 border-b bg-white">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link href="/freebie" passHref className="w-32">
            <Image
              src="/assets/logo2.svg"
              alt="Celerey"
              width={80}
              height={30}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 items-center">
            {/* Desktop User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                }}
                className="flex items-center"
              >
                <UserCircle className="h-8 w-8 text-navy cursor-pointer" />
                <ChevronDown
                  className={`ml-1 h-4 w-4 text-gray-600 transition-transform ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isUserDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <UserDropdownMenu />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6 text-navy" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div
            ref={mobileNavRef}
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3 p-2 border-b pb-4">
                  <UserCircle className="h-10 w-10 text-navy" />
                  <div className="text-sm font-medium">My Account</div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-2 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <LogOut className="h-5 w-5 mr-3 text-gray-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow bg-gray-50">
        <main className="max-w-screen-2xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {children}
        </main>
      </div>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-sm font-helvetica text-gray-500">
            © Celerey {new Date().getFullYear()}
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
