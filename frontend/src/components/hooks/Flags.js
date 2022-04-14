import { useState } from "react";
import { createContext } from "react";

export const FlagContext = createContext();

export const FlagsProvider = ({ children }) => {
  const [notTripPage, setNotTripPage] = useState(true);

  return (
    <FlagContext.Provider value={{ notTripPage, setNotTripPage }}>
      {children}
    </FlagContext.Provider>
  );
};
