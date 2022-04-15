import { useState, useEffect } from "react";
import { createContext } from "react";
import { useHistory } from "react-router-dom";

export const ParksListContext = createContext();

export const ParksListProvider = ({ children }) => {
  const [parksList, setParksList] = useState([]);
  const [origins, setOrigins] = useState([]);

  let history = useHistory();

  useEffect(() => {
    fetch("/parks")
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          history.push("/Error");
          return;
        }
        // console.log("data", data.data.origin.parksOrigin);
        setParksList(data.data?.parks || []);
        setOrigins(data.data?.origin.parksOrigin || []);
      })
      .catch((error) => {
        // console.log(error.message);
        history.push("/Error");
      });
  }, []);

  return (
    <ParksListContext.Provider value={{ parksList, origins }}>
      {children}
    </ParksListContext.Provider>
  );
};
