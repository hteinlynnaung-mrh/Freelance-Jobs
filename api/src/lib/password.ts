import bcrypt from "bcryptjs";

const PASSWORD_ROUNDS = 12;

export const hashPassword = (password: string) => bcrypt.hash(password, PASSWORD_ROUNDS);
export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);
