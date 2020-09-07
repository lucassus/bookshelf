import { ValidationError } from "../types.generated";

export const normalizeValidationErrors = (
  validationErrors: Pick<ValidationError, "path" | "message">[]
) =>
  validationErrors.reduce(
    (errors, { path, message }) => ({
      ...errors,
      [path]: message
    }),
    {}
  );
