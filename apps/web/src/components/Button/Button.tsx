import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FunctionComponent<Props> = ({
  className,
  ...props
}) => <button className={clsx(styles.container, className)} {...props} />;
