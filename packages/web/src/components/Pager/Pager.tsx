import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import styles from "./Pager.module.scss";

type Props = {
  currentPage: number;
  totalPages: number;
  path: (page: number) => string;
};

// TODO: Add some some nice styles
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

  // TODO: Find a nicer solution
  const linkClassName = (page: number) =>
    page === currentPage ? styles.current : undefined;

  return (
    <div className={styles.container}>
      <>
        <Link className={linkClassName(firstPage)} to={path(firstPage)}>
          first
        </Link>
        <Link
          className={linkClassName(firstPage)}
          to={path(currentPage > 1 ? currentPage - 1 : firstPage)}
        >
          prev
        </Link>
      </>

      {pages.map((page) => (
        <Link key={page} to={path(page)} className={linkClassName(page)}>
          {page}
        </Link>
      ))}

      <>
        <Link
          className={linkClassName(lastPage)}
          to={path(currentPage < totalPages ? currentPage + 1 : lastPage)}
        >
          next
        </Link>
        <Link className={linkClassName(lastPage)} to={path(lastPage)}>
          last
        </Link>
      </>
    </div>
  );
};
