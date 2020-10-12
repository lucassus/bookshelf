import React, { useContext } from "react";

import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import { useGetCurrentUserQuery } from "./GetCurrentUser.query.generated";

const CurrentUserContext = React.createContext<null | CurrentUserFragment>(
  null
);

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider: React.FunctionComponent = ({ children }) => {
  const { data, loading } = useGetCurrentUserQuery();

  if (loading || data === undefined) {
    return <span>Loading...</span>;
  }

  // TODO: current user could be ProtectedUser | null | undefined
  // TODO: Try use `avoidOptionals` flag
  const { currentUser } = data;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
