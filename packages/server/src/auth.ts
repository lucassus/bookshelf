import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
}

export function isPasswordValid(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
