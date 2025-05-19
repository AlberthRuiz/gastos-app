import React, { useEffect, useState } from "react";
import { ModalProps } from "./ModalProps";

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [modalState, setModalState] = useState("closed");  
  useEffect(() => {
    if (isOpen && modalState === "closed") {
      setModalState("opening");
      setTimeout(() => setModalState("open"), 10);
    } else if (!isOpen && (modalState === "open" || modalState === "opening")) {
      setModalState("closing");
      setTimeout(() => setModalState("closed"), 300);
    }
  }, [isOpen, modalState]);
  
  if (modalState === "closed") return null;
  
  const overlayClass = 
    modalState === "opening" || modalState === "closing" 
      ? "opacity-0" 
      : "opacity-50";
      
  const modalClass = 
    modalState === "opening" 
      ? "opacity-0 transform scale-95" 
      : modalState === "closing" 
        ? "opacity-0 transform scale-95" 
        : "opacity-100 transform scale-100";
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${overlayClass}`} 
        onClick={onClose}
      ></div>
      <div 
        className={`bg-white rounded-lg shadow-lg z-10 w-full max-w-md mx-4 transition-all duration-300 ${modalClass}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
