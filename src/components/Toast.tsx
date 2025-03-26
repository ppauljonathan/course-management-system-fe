import { XMarkIcon } from '@heroicons/react/24/solid'
import { ToastType } from '../utils/types';

interface ToastProps {
  message: string;
  type: ToastType
  onClose: () => void;
}

function Toast({ message, onClose, type = 'default' }: ToastProps) {
  function assignToastTypeColor(type: ToastType): string {
    switch(type) {
      case 'success':
        return 'bg-green-800 text-white';
      case 'error':
        return 'bg-red-800 text-white';
      case 'warning':
        return 'bg-yellow-300 text-black';
      default:
        return 'bg-blue-800 text-white';

    }

  }

  return (
    <>
      <div
        className={`w-xs h-fit p-5 rounded-2xl flex mb-2 ${assignToastTypeColor(type)}`}
      >
      <div>{message}</div>
      <div className="ml-auto cursor-pointer" onClick={onClose}><XMarkIcon className='size-6'></XMarkIcon></div>
     </div>
    </>
  )
}

export default Toast
