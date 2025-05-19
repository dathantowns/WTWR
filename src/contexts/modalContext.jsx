import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState([]);

  return (
    <ModalContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
