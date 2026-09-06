import { createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import type { UserRole } from "./auth.js";

type AccessTokenPayload = {
  sub: string;
  role: UserRole;
};

export const createAccessToken = (userId: string, role: UserRole) =>
  jwt.sign({ sub: userId, role } satisfies AccessTokenPayload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_TTL_SECONDS
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, config.JWT_ACCESS_SECRET) as AccessTokenPayload;

export const createRefreshToken = () => randomBytes(48).toString("base64url");

export const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export const refreshTokenExpiresAt = () => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + config.REFRESH_TOKEN_TTL_DAYS);
  return expiresAt;
};
