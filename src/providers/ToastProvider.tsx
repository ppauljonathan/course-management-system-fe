import { useState, useCallback, ReactNode } from "react";

import Toast from "../components/Toast";
import ToastContext from "../contexts/ToastContext";
import { ToastType } from "../utils/types";

interface ToastData {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProviderProps {
  children: ReactNode;
}

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (message: string, type: ToastType = 'default', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type: type }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed right-5 top-15 space-y-2">
        {toasts.map(({ id, message, type }) => (
          <Toast key={id} message={message} type={type} onClose={() => removeToast(id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
