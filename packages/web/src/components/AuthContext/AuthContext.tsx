import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import { useLogoutMutation } from "../AppTopBar/Logout.mutation.generated";
import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import {
  GetCurrentUserDocument,
  useGetCurrentUserQuery
} from "./GetCurrentUser.query.generated";

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

const LOGOUT_EVENT_KEY = "logout";

export const dispatchLogoutEventToAllWindows = () => {
  window.localStorage.setItem(LOGOUT_EVENT_KEY, Math.random().toString());

  // Dispatch the event in the current window
  const event = new StorageEvent("storage", { key: LOGOUT_EVENT_KEY });
  window.dispatchEvent(event);
};

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
    const logoutEventListener = async (event: any) => {
      if (event.key === LOGOUT_EVENT_KEY) {
        client.writeQuery({
          query: GetCurrentUserDocument,
          data: { currentUser: null }
        });
      }
    };

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
