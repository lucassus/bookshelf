import React from "react";

import styles from "./Alert.scss";

type Props = {
  severity: "error";
  action?: React.ReactNode;
};

export const Alert: React.FunctionComponent<Props> = ({ children, action }) => (
  <div className={styles.container}>
    <div>{children}</div>
    {action && <div>{action}</div>}
  </div>
);
