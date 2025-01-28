import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  sectionNumber?: number;
  sectionTitle?: string;
  nextSectionTitle?: string;
  isSectionComplete?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  sectionNumber,
  sectionTitle,
  nextSectionTitle,
  isSectionComplete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader className="pt-5">
          <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-medium font-cirka text-center">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-gray-500 text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Render the SectionHeader if sectionNumber and sectionTitle are provided */}
        {sectionNumber !== undefined && sectionTitle && (
          <div className="flex flex-col sm:flex-row items-center justify-center p-5 gap-2 sm:gap-4">
            <div className="flex items-center">
              <div
                className={`text-xs mr-2 font-light flex items-center justify-center w-6 h-6 rounded-full ${
                  isSectionComplete
                    ? "bg-blue-900 text-white"
                    : "bg-white border-blue-900 border text-blue-900"
                }`}
              >
                {sectionNumber}
              </div>
              <h3
                className={`font-light text-sm ${
                  isSectionComplete ? "text-blue-900" : "text-gray-500"
                }`}
              >
                {sectionTitle}
              </h3>
            </div>
            <div
              className={`hidden sm:block flex-1 h-[2px] my-auto mx-2 ${
                isSectionComplete ? "bg-blue-900" : "bg-gray-300"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`text-xs mr-2 font-light flex items-center justify-center w-6 h-6 rounded-full ${
                  isSectionComplete
                    ? "bg-blue-900 text-white"
                    : "bg-white border-blue-900 border text-blue-900"
                }`}
              >
                {sectionNumber + 1}
              </div>
              <h3
                className={`font-light text-sm ${
                  isSectionComplete ? "text-blue-900" : "text-gray-500"
                }`}
              >
                {nextSectionTitle}
              </h3>
            </div>
          </div>
        )}

        <div className="max-w-sm w-full mx-auto px-4 sm:px-0">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
