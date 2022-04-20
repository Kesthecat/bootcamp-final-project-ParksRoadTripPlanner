import { useState, useEffect } from "react";
import { createContext } from "react";

export const ParksListContext = createContext();

export const ParksListProvider = ({ children }) => {
  const [parksList, setParksList] = useState([]);
  const [origins, setOrigins] = useState([]);

  useEffect(() => {
    fetch("/parks")
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data.message);
        if (data.message !== "success") {
          window.alert("Something went wrong, please try again.");
          return;
        }
        setParksList(data.data?.parks || []);
        setOrigins(data.data?.origin.parksOrigin || []);
      })
      .catch((error) => {
        // console.log(error.message);
        window.alert("Something went wrong, please contact customer services.");
      });
  }, []);

  return (
    <ParksListContext.Provider value={{ parksList, origins }}>
      {children}
    </ParksListContext.Provider>
  );
};
