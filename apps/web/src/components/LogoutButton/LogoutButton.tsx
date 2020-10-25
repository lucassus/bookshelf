import React, { useCallback } from "react";
import { useNavigate } from "react-router";

import { resetWsConnection } from "../../apolloClient";
import { Button } from "../Button";
import { useLogoutMutation } from "./Logout.mutation.generated";

type Props = {
  onSuccess: () => void;
};

export const LogoutButton: React.FunctionComponent<Props> = ({
  children,
  onSuccess
}) => {
  const navigate = useNavigate();

  const [logout] = useLogoutMutation({ update: (cache) => cache.reset() });

  const handleClick = useCallback(async () => {
    await logout();
    navigate("/");
    resetWsConnection();
    onSuccess();
  }, [logout, navigate, onSuccess]);

  return <Button onClick={handleClick}>{children}</Button>;
};
