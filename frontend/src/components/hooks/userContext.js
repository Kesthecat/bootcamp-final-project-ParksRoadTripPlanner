import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const signedInUser = localStorage.getItem("user");
    const id = localStorage.getItem("userId");

    if (signedInUser && id) {
      setUserId(id);
      setUsername(signedInUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
