import { XMarkIcon } from "@heroicons/react/24/solid";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
};


function Modal({ children, title, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-10" onClick={onClose}>
        <div
          className="p-5 w-fit min-w-1/5 max-w-4/5 h-fit min-h-1/10 max-h-7/10 overflow-y-auto
            bg-white dark:bg-gray-800 rounded-2xl absolute top-1/2 left-1/2 transform -translate-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex mb-5">
            <h2 className="font-bold text-2xl m-auto">{title}</h2>
            <XMarkIcon className="size-6  cursor-pointer" onClick={onClose} />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal;
