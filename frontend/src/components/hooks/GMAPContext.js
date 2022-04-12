import { useState } from "react";
import { createContext } from "react";

export const GMAPContext = createContext();

export const GMAPProvider = ({ children }) => {
  const [maps, setMaps] = useState(null);

  return (
    <GMAPContext.Provider value={{ maps, setMaps }}>
      {children}
    </GMAPContext.Provider>
  );
};
