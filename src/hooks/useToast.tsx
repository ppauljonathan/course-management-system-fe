import { ReactNode, useCallback, useState } from "react"

import Toast from "../components/Toast"
import { TOAST_TIMEOUT_MILLISECONDS } from "../utils/constants";

interface ToastData {
  id: number;
  message: string;
}

function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const hideToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast: ReactNode = (
    <div className="absolute top-15 right-5">
      {toasts.map(({id, message}) => <Toast key={id} message={message} onClose={() => hideToast(id)} />)}
    </div>
  )

  function showToast(message: string, duration = TOAST_TIMEOUT_MILLISECONDS) {
    const id = Number(Date.now());

    setToasts((prev) => [...prev, { id: id, message: message }]);

    setTimeout(() => hideToast(id), duration);
  }



  return { showToast, toast };
}

export default useToast
