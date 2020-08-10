import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextValue {
  isAuthenticated: boolean;
  authorize: () => void;
  unauthorize: () => void;
}

const DEFAULT_VALUE: AuthContextValue = {
  isAuthenticated: false,
  authorize: () => {},
  unauthorize: () => {}
};

const AuthContext = React.createContext<AuthContextValue>(DEFAULT_VALUE);

export const useAuth = () => useContext(AuthContext);

const IS_AUTHENTICATED_KEY = "isAuthenticated";

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setAuthenticated] = useState(
    () => window.localStorage.getItem(IS_AUTHENTICATED_KEY) === "true"
  );

  useEffect(() => {
    window.localStorage.setItem(
      IS_AUTHENTICATED_KEY,
      isAuthenticated ? "true" : "false"
    );
  }, [isAuthenticated]);

  const authorize = async () => {
    setAuthenticated(true);
    navigate("/");
  };

  const unauthorize = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authorize, unauthorize }}>
      {children}
    </AuthContext.Provider>
  );
};
