import React, { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { useLogoutMutation } from "../AppTopBar/Logout.mutation.generated";
import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import { useGetCurrentUserQuery } from "./GetCurrentUser.query.generated";

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

  const [currentUser, setCurrentUser] = useState<
    undefined | CurrentUserFragment
  >(undefined);

  useGetCurrentUserQuery({
    onCompleted: (data) => setCurrentUser(data.currentUser),
    onError: () => setCurrentUser(undefined)
  });

  const [logout] = useLogoutMutation();

  const authorize = useCallback(
    (user: CurrentUserFragment) => {
      setCurrentUser(user);
      navigate("/");
    },
    [navigate]
  );

  const unauthorize = useCallback(async () => {
    await logout();
    setCurrentUser(undefined);
    navigate("/");
  }, [logout, navigate]);

  const value = useMemo(
    () => ({
      currentUser,
      authorize,
      unauthorize
    }),
    [currentUser, authorize, unauthorize]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
