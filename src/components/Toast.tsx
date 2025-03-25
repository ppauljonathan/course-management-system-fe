import { XMarkIcon } from '@heroicons/react/24/solid'

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  return (
    <>
      <div
        className="opacity-100 bg-red-500 text-white w-xs h-fit p-5 rounded-2xl flex mb-2"
      >
      <div>{message}</div>
      <div className="ml-auto cursor-pointer" onClick={onClose}><XMarkIcon className='size-6'></XMarkIcon></div>
     </div>
    </>
  )
}

export default Toast
