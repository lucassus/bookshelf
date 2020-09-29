import React, { useContext } from "react";

import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import { useGetCurrentUserQuery } from "./GetCurrentUser.query.generated";

interface AuthContextValue {
  currentUser?: CurrentUserFragment;
}

const DEFAULT_VALUE: AuthContextValue = {
  currentUser: undefined
};

const AuthContext = React.createContext<AuthContextValue>(DEFAULT_VALUE);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {
  const { data, loading } = useGetCurrentUserQuery();

  if (loading || !data) {
    return <span>Loading...</span>;
  }

  const currentUser = data.currentUser ?? undefined;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
