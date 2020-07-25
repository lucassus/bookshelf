import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextValue {
  isAuthenticated: boolean;
  authorize: (authToken: string) => void;
  unauthorize: () => void;
}

const DEFAULT_VALUE: AuthContextValue = {
  isAuthenticated: false,
  authorize: () => {},
  unauthorize: () => {}
};

const AuthContext = React.createContext<AuthContextValue>(DEFAULT_VALUE);

export const useAuth = () => useContext(AuthContext);

const AUTH_TOKEN_KEY = "authToken";

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setAuthenticated] = useState(
    () => !!window.localStorage.getItem(AUTH_TOKEN_KEY)
  );

  const authorize = async (authToken: string) => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    setAuthenticated(true);
    navigate("/");
  };

  const unauthorize = () => {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authorize, unauthorize }}>
      {children}
    </AuthContext.Provider>
  );
};
