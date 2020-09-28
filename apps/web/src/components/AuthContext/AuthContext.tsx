import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router";

import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import {
  GetCurrentUserDocument,
  useGetCurrentUserQuery
} from "./GetCurrentUser.query.generated";
import { useLogoutMutation } from "./Logout.mutation.generated";

interface AuthContextValue {
  currentUser?: CurrentUserFragment;
  authorize: (currentUser: CurrentUserFragment) => void;
  unauthorize: () => Promise<void>;
}

const DEFAULT_VALUE: AuthContextValue = {
  currentUser: undefined,
  authorize: () => {},
  unauthorize: async () => {}
};

const AuthContext = React.createContext<AuthContextValue>(DEFAULT_VALUE);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {
  const navigate = useNavigate();

  const { data, loading } = useGetCurrentUserQuery({ errorPolicy: "ignore" });

  const [logout, { client }] = useLogoutMutation();

  // TODO: Clear the store after login
  const authorize = useCallback(
    (currentUser: CurrentUserFragment) => {
      client.writeQuery({
        query: GetCurrentUserDocument,
        data: { currentUser }
      });

      navigate("/");
    },
    [client, navigate]
  );

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
    <AuthContext.Provider
      value={{
        currentUser,
        authorize,
        unauthorize
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
