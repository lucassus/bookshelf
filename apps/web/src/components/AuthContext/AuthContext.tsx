import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router";

import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import { useGetCurrentUserQuery } from "./GetCurrentUser.query.generated";
import { useLogoutMutation } from "./Logout.mutation.generated";

interface AuthContextValue {
  currentUser?: CurrentUserFragment;
  unauthorize: () => Promise<void>;
}

const DEFAULT_VALUE: AuthContextValue = {
  currentUser: undefined,
  unauthorize: async () => {}
};

const AuthContext = React.createContext<AuthContextValue>(DEFAULT_VALUE);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {
  const navigate = useNavigate();

  const { data, loading } = useGetCurrentUserQuery({ errorPolicy: "ignore" });

  const [logout, { client }] = useLogoutMutation();

  const unauthorize = useCallback(async () => {
    await logout();
    await client.resetStore();

    navigate("/");
  }, [client, logout, navigate]);

  if (loading) {
    return <span>Loading...</span>;
  }

  const currentUser = data ? data.currentUser : undefined;

  return (
    <AuthContext.Provider value={{ currentUser, unauthorize }}>
      {children}
    </AuthContext.Provider>
  );
};
