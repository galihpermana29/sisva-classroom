import { createContext, useContext, useState } from "react";

const ModalContext = createContext(undefined);

const ModalProvider = ({ children }) => {
  const initialState = {
    title: "",
    isOpen: false,
    type: "",
    data: {},
  };

  const [modalState, setModalState] = useState(initialState);

  const handleClose = () => {
    setModalState(initialState);
  };

  return (
    <ModalContext.Provider value={{ modalState, setModalState, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export { ModalProvider, useModal };
