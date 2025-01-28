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
      <DialogContent className="">
        <DialogHeader className="pt-5">
          <DialogTitle className="text-4xl font-medium font-cirka text-center">
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
          <div className="flex p-5">
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
            <div
              className={`flex-1 h-[2px] my-auto mx-2 ${
                isSectionComplete ? "bg-blue-900" : "bg-gray-300"
              }`}
            ></div>
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
        )}

        <div className="max-w-sm flex flex-col mx-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
