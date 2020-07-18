import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import styles from "./Pager.module.scss";

type Props = {
  currentPage: number;
  totalPages: number;
  path: (page: number) => string;
};

export const Pager: React.FunctionComponent<Props> = ({
  currentPage,
  totalPages,
  path
}) => {
  const pages = useMemo(
    () => new Array(totalPages).fill(null).map((_, index) => index + 1),
    [totalPages]
  );

  const firstPage = 1;
  const lastPage = totalPages;

  return (
    <ul className={styles.container}>
      <li>
        <Link to={path(firstPage)}>first</Link>
      </li>

      <li>
        <Link to={path(currentPage > 1 ? currentPage - 1 : firstPage)}>
          prev
        </Link>
      </li>

      {pages.map((page) => (
        <li key={page}>
          <Link
            to={path(page)}
            className={page === currentPage ? styles.current : undefined}
          >
            {page}
          </Link>
        </li>
      ))}

      <li>
        <Link to={path(currentPage < totalPages ? currentPage + 1 : lastPage)}>
          next
        </Link>
      </li>

      <li>
        <Link to={path(lastPage)}>last</Link>
      </li>
    </ul>
  );
};
