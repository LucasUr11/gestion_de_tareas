import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void;
    children: ReactNode;
};

export const Modal = ({isOpen, onClose, children}: ModalProps) => {
    
    if (!isOpen) return null;

    return (
        <div>
            <button onClick={onClose}>X</button>
            {children}
        </div>
    )
}