import { useState, useEffect } from "react";
import { createContext } from "react";

export const ParksListContext = createContext();

export const ParksListProvider = ({ children }) => {
  const [parksList, setParksList] = useState([]);

  useEffect(() => {
    fetch("/parks")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setParksList(data.data);
      });
  }, []);

  return (
    <ParksListContext.Provider value={{ parksList }}>
      {children}
    </ParksListContext.Provider>
  );
};
