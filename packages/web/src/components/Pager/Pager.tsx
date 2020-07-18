import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import styles from "./Pager.module.scss";

type Props = {
  currentPage: number;
  totalPages: number;
  buildPathFor: (page: number) => string;
};

export const Pager: React.FunctionComponent<Props> = ({
  currentPage,
  totalPages,
  buildPathFor
}) => {
  const pages = useMemo(
    () => new Array(totalPages).fill(null).map((_, index) => index + 1),
    [totalPages]
  );

  const firstPage = 1;
  const prevPage = currentPage > 1 ? currentPage - 1 : firstPage;
  const lastPage = totalPages;
  const nextPage = currentPage < totalPages ? currentPage + 1 : lastPage;

  return (
    <ul className={styles.container}>
      <li>
        <Link to={buildPathFor(firstPage)}>first</Link>
      </li>

      <li>
        <Link to={buildPathFor(prevPage)}>prev</Link>
      </li>

      {pages.map((page) => (
        <li key={page}>
          <Link
            to={buildPathFor(page)}
            className={page === currentPage ? styles.current : undefined}
          >
            {page}
          </Link>
        </li>
      ))}

      <li>
        <Link to={buildPathFor(nextPage)}>next</Link>
      </li>

      <li>
        <Link to={buildPathFor(lastPage)}>last</Link>
      </li>
    </ul>
  );
};
