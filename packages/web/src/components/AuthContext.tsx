import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";

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

  const { loading } = useGetCurrentUserQuery({
    onCompleted: (data) => {
      if (data) {
        setCurrentUser(data.currentUser);
      } else {
        setCurrentUser(undefined);
      }
    }
  });

  const authorize = useCallback(
    (user: CurrentUserFragment) => {
      setCurrentUser(user);
      navigate("/");
    },
    [navigate]
  );

  const unauthorize = useCallback(async () => {
    setCurrentUser(undefined);
    navigate("/");
  }, [navigate]);

  if (loading) {
    return <div>Loading the app...</div>;
  }

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
