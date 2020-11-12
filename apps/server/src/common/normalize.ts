export const normalize = <U extends { id: string | number }>(rows: U[]) =>
  rows.reduce<Record<string | number, U>>(
    (result, row) => ({
      ...result,
      [row.id]: row
    }),
    {}
  );
