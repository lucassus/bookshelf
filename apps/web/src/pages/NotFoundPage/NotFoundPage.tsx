import React from "react";

type Props = {
  message?: string;
};

export const NotFoundPage: React.FunctionComponent<Props> = ({ message }) => (
  <div>
    <h3>Page not found!</h3>
    {message && <h4>{message}</h4>}
  </div>
);
