import clsx from "clsx";
import React, { HTMLAttributes } from "react";

import styles from "./Card.scss";

type Props = HTMLAttributes<HTMLDivElement>;

export const Card: React.FunctionComponent<Props> = ({
  className,
  ...props
}) => <div className={clsx(styles.container, className)} {...props} />;
