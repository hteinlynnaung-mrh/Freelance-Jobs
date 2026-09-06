import type { UserRole } from "../lib/auth.js";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        role: UserRole;
      };
      requestId: string;
    }
  }
}

export {};
