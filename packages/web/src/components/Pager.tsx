import React, { useMemo } from "react";

type Props = {
  count: number;
  onChange: (page: number) => any;
};

export const Pager: React.FunctionComponent<Props> = ({ count, onChange }) => {
  const pages = useMemo(
    () => new Array(count).fill(null).map((_, index) => index + 1),
    [count]
  );

  return (
    <div>
      <button onClick={() => onChange(1)}>first</button>

      {pages.map((page) => (
        <button key={page} onClick={() => onChange(page)}>
          {page}
        </button>
      ))}

      <button onClick={() => onChange(count)}>last</button>
    </div>
  );
};
