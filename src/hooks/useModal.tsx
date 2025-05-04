import { useState, ReactNode, Dispatch, SetStateAction, ReactElement } from "react";

import Modal from '../components/Modal';

type RenderModal = (props: {children: ReactNode; title: string;}) => ReactElement | null

function useModal(): [RenderModal, Dispatch<SetStateAction<boolean>>] {
  const [showModal, setShowModal] = useState(false);

  const RenderModal:RenderModal = ({children, title}) =>
    showModal ? <Modal title={title} onClose={() => setShowModal(false)} >{children}</Modal>: null

  return [RenderModal, setShowModal];
}

export default useModal;
