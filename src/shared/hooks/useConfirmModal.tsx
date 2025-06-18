import { useState, useCallback } from "react";
import ConfirmModal from "../components/ConfirmModal";

interface ConfirmOptions {
  title: string;
  message: string;
  onConfirm: () => void;
}

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "",
    message: "",
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
      onCancel={closeModal}
      onConfirm={handleConfirm}
    />
  );

  return { openModal, ConfirmModalComponent };
};