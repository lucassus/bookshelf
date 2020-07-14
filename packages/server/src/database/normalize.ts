export const normalize = <U extends { id: number }>(rows: U[]) =>
  rows.reduce<Record<number, U>>(
    (result, row) => ({
      ...result,
      [row.id]: row
    }),
    {}
  );
