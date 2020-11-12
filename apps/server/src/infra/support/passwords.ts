import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
}

export const isPasswordValid = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);
