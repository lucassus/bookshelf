import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import { useLogoutMutation } from "../AppTopBar/Logout.mutation.generated";
import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import {
  GetCurrentUserDocument,
  useGetCurrentUserQuery
} from "./GetCurrentUser.query.generated";
import {
  createLogoutEventListener,
  dispatchLogoutEventToAllWindows
} from "./logoutEvent";

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

  const { data, loading } = useGetCurrentUserQuery();

  const [logout, { client }] = useLogoutMutation();

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
    dispatchLogoutEventToAllWindows();
  }, [logout]);

  // Listen for logout events
  useEffect(() => {
    const logoutEventListener = createLogoutEventListener(() =>
      client.writeQuery({
        query: GetCurrentUserDocument,
        data: { currentUser: null }
      })
    );

    window.addEventListener("storage", logoutEventListener);

    return () => window.removeEventListener("storage", logoutEventListener);
  }, [client]);

  if (loading) {
    return <span>Loading...</span>;
  }

  const currentUser = data!.currentUser ?? undefined;

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
