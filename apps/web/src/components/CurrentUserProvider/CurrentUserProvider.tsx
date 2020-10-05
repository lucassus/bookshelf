import React, { useContext } from "react";

import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import { useGetCurrentUserQuery } from "./GetCurrentUser.query.generated";

const CurrentUserContext = React.createContext<undefined | CurrentUserFragment>(
  undefined
);

export const useCurrentUser = () => useContext(CurrentUserContext);

export const CurrentUserProvider: React.FunctionComponent = ({ children }) => {
  const { data, loading } = useGetCurrentUserQuery();

  if (loading || !data) {
    return <span>Loading...</span>;
  }

  const currentUser =
    data.currentUser.__typename === "ProtectedUser"
      ? data.currentUser
      : undefined;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
