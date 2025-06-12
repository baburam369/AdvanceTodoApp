import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsloggedin] = useState(false);

  useEffect(() => {
    const loginState = localStorage.getItem("isLoggedin");
    if (loginState === "true") {
      setIsloggedin(true);
    }
  }, []);

  const getUser = () => {};

  const setUser = async (payload) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, payload);
      localStorage.setItem("isLoggedin", "true");
      setIsloggedin(true);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  console.log("context", isLoggedin);

  return (
    <AppContext.Provider
      value={{
        isLoggedin,
        setIsloggedin,
        getUser,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
