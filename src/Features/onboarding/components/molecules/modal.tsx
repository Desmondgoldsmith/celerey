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
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader className="p-5">
          <DialogTitle className="text-4xl font-medium font-cirka text-center">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-gray-500 text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="max-w-sm flex flex-col mx-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
