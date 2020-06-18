import React from "react";

type Props = {
  severity: "error";
  action?: React.ReactNode;
};

export const Alert: React.FunctionComponent<Props> = ({ children }) => (
  <div>{children}</div>
);
