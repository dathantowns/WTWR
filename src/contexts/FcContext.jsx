import React, { useState, createContext, useContext } from "react";

export const FcContext = createContext({});

export const FcProvider = ({ children }) => {
  const [unit, setUnit] = useState("f");
  const [isChecked, setIsChecked] = useState(false);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "f" ? "c" : "f"));
  };

  return (
    <FcContext.Provider value={{ unit, toggleUnit, isChecked, setIsChecked }}>
      {children}
    </FcContext.Provider>
  );
};

export const useFc = () => useContext(FcContext);
