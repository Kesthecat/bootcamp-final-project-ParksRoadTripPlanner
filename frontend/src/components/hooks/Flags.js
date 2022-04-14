import { useState } from "react";
import { createContext } from "react";

export const FlagContext = createContext();

export const FlagsProvider = ({ children }) => {
  const [notTripPage, setNotTripPage] = useState(true);
  const [addedWaypoint, setAddedWaypoint] = useState(false);

  return (
    <FlagContext.Provider
      value={{ notTripPage, setNotTripPage, addedWaypoint, setAddedWaypoint }}
    >
      {children}
    </FlagContext.Provider>
  );
};
