import type { NextFunction, Request, Response } from "express";
import { isUserRole } from "../lib/auth.js";
import { forbidden, unauthorized } from "../lib/errors.js";
import { verifyAccessToken } from "../lib/tokens.js";

export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.header("authorization");
  if (!header?.startsWith("Bearer ")) return next(unauthorized());

  try {
    const payload = verifyAccessToken(header.slice("Bearer ".length));
    if (typeof payload.sub !== "string" || !isUserRole(payload.role)) {
      return next(unauthorized("Invalid access token"));
    }
    req.auth = { userId: payload.sub, role: payload.role };
    next();
  } catch {
    next(unauthorized("Invalid or expired access token"));
  }
};

export const requireRole = (...roles: Array<"CLIENT" | "FREELANCER" | "ADMIN">) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) return next(unauthorized());
    if (!roles.includes(req.auth.role)) {
      return next(forbidden());
    }
    next();
  };
