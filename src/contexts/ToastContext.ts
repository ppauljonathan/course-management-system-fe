import { createContext } from "react";

import { ToastType } from "../utils/types";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export default ToastContext; 

