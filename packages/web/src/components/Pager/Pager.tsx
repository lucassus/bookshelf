import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import styles from "./Pager.module.scss";

type Props = {
  currentPage: number;
  totalPages: number;
  path: (page: number) => string;
};

const PageLink: React.FunctionComponent<{ to: string; isCurrent: boolean }> = ({
  to,
  isCurrent,
  children
}) => (
  <Link to={to} className={isCurrent ? styles.current : undefined}>
    {children}
  </Link>
);

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

  return (
    <div className={styles.container}>
      <PageLink to={path(firstPage)} isCurrent={currentPage === firstPage}>
        first
      </PageLink>
      <PageLink
        to={path(currentPage > 1 ? currentPage - 1 : firstPage)}
        isCurrent={currentPage === firstPage}
      >
        prev
      </PageLink>

      {pages.map((page) => (
        <PageLink key={page} to={path(page)} isCurrent={currentPage === page}>
          {page}
        </PageLink>
      ))}

      <PageLink
        to={path(currentPage < totalPages ? currentPage + 1 : lastPage)}
        isCurrent={currentPage === lastPage}
      >
        next
      </PageLink>

      <PageLink to={path(lastPage)} isCurrent={currentPage === lastPage}>
        last
      </PageLink>
    </div>
  );
};
