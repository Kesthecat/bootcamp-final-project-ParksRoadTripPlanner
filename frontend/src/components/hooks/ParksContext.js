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
        // console.log("data", data.data.origin.parksOrigin);
        setParksList(data.data.parks);
        setOrigins(data.data.origin.parksOrigin);
      })
      .catch((error) => {
        console.log(error.message);
        history.push("/internalError");
      });
  }, []);

  return (
    <ParksListContext.Provider value={{ parksList, origins }}>
      {children}
    </ParksListContext.Provider>
  );
};
