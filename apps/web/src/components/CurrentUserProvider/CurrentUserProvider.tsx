import React, { useContext } from "react";

import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import { useGetCurrentUserQuery } from "./GetCurrentUser.query.generated";

const CurrentUserContext = React.createContext<null | CurrentUserFragment>(
  null
);

export const useCurrentUser = () => useContext(CurrentUserContext);

type Props = {
  children: React.ReactNode;
};

export const CurrentUserProvider: React.FunctionComponent<Props> = ({
  children
}) => {
  const { data, loading } = useGetCurrentUserQuery();

  if (loading || data === undefined) {
    return <span>Loading...</span>;
  }

  const { currentUser } = data;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
