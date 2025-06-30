import { useState, useCallback, ReactNode } from "react";
import ConfirmModal from "../components/ConfirmModal";

interface ConfirmOptions {
  title: string;
  message: string;
  children: ReactNode;
  onConfirm: () => void;
}

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "",
    message: "",
    children: null,
    onConfirm: () => {},
  });
  
  const openModal = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    options.onConfirm?.();
    closeModal();
  }, [options, closeModal]);

  const ConfirmModalComponent = (
    <ConfirmModal
      isOpen={isOpen}
      title={options.title}
      message={options.message}
      children={options.children}
      onCancel={closeModal}
      onConfirm={handleConfirm}
    >
    </ConfirmModal>
  );

  return { openModal, ConfirmModalComponent };
};