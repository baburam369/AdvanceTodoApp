import { createContext, useContext } from "react";
import { useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsloggedin] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedin,
        setIsloggedin,
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
