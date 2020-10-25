import classNames from "classnames";
import React, { HTMLAttributes } from "react";

import styles from "./Card.scss";

type Props = HTMLAttributes<HTMLDivElement>;

// TODO: Use cslx
export const Card: React.FunctionComponent<Props> = ({
  className,
  ...props
}) => <div className={classNames(styles.container, className)} {...props} />;
