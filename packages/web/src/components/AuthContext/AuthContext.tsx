import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router";

import { useLogoutMutation } from "../AppTopBar/Logout.mutation.generated";
import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import {
  GetCurrentUserDocument,
  useGetCurrentUserQuery
} from "./GetCurrentUser.query.generated";

interface AuthContextValue {
  currentUser?: CurrentUserFragment;
  authorize: (user: CurrentUserFragment) => void;
  unauthorize: () => void;
}

const DEFAULT_VALUE: AuthContextValue = {
  currentUser: undefined,
  authorize: () => {},
  unauthorize: () => {}
};

const AuthContext = React.createContext<AuthContextValue>(DEFAULT_VALUE);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FunctionComponent = ({ children }) => {
  const navigate = useNavigate();

  const { data, loading, error } = useGetCurrentUserQuery();

  const [logout, { client }] = useLogoutMutation();

  const authorize = useCallback(
    (user: CurrentUserFragment) => {
      client.writeQuery({
        query: GetCurrentUserDocument,
        data: { currentUser: user }
      });

      navigate("/");
    },
    [client, navigate]
  );

  const unauthorize = useCallback(async () => {
    await logout();

    client.writeQuery({
      query: GetCurrentUserDocument,
      data: { currentUser: null }
    });
  }, [logout, client]);

  // TODO: Handle expired or invalid auth tokens
  if (loading) {
    return <span>Loading...</span>;
  }

  const { currentUser } = data!;

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
