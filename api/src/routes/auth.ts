import { Router } from "express";
import { z } from "zod";
import { isUserRole } from "../lib/auth.js";
import { badRequest, conflict, unauthorized } from "../lib/errors.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { createAccessToken, createRefreshToken, hashToken, refreshTokenExpiresAt } from "../lib/tokens.js";
import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../prisma.js";

const email = z.string().trim().email().transform((value) => value.toLowerCase());
const password = z.string().min(8).max(128);
const registerSchema = z.object({
  email,
  password,
  role: z.enum(["CLIENT", "FREELANCER"]),
  displayName: z.string().trim().min(2).max(80)
});
const loginSchema = z.object({ email, password });
const refreshSchema = z.object({ refreshToken: z.string().min(20) });

const publicUser = (user: { id: string; email: string; role: string; status: string }) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  status: user.status
});

const createSession = async (user: { id: string; role: string }) => {
  if (!isUserRole(user.role)) throw new Error("Invalid user role");
  const rawRefreshToken = createRefreshToken();
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(rawRefreshToken),
      expiresAt: refreshTokenExpiresAt()
    }
  });
  return {
    accessToken: createAccessToken(user.id, user.role),
    refreshToken: rawRefreshToken
  };
};

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const input = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw conflict("An account with this email already exists");

    const user = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: { email: input.email, passwordHash: await hashPassword(input.password), role: input.role }
      });
      if (input.role === "CLIENT") {
        await tx.clientProfile.create({ data: { userId: created.id, displayName: input.displayName } });
      } else {
        await tx.freelancerProfile.create({ data: { userId: created.id, displayName: input.displayName } });
      }
      return created;
    });

    res.status(201).json({ data: { user: publicUser(user), ...(await createSession(user)) } });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const input = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
      throw unauthorized("Email or password is incorrect");
    }
    if (user.status !== "ACTIVE") throw unauthorized("This account is not active");
    res.json({ data: { user: publicUser(user), ...(await createSession(user)) } });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/refresh", async (req, res, next) => {
  try {
    const input = refreshSchema.parse(req.body);
    const tokenHash = hashToken(input.refreshToken);
    const stored = await prisma.refreshToken.findUnique({ where: { tokenHash }, include: { user: true } });
    if (!stored || stored.revokedAt || stored.expiresAt <= new Date() || stored.user.status !== "ACTIVE") {
      throw unauthorized("Invalid or expired refresh token");
    }

    const nextToken = createRefreshToken();
    await prisma.$transaction([
      prisma.refreshToken.update({ where: { id: stored.id }, data: { revokedAt: new Date() } }),
      prisma.refreshToken.create({
        data: { userId: stored.userId, tokenHash: hashToken(nextToken), expiresAt: refreshTokenExpiresAt() }
      })
    ]);
    if (!isUserRole(stored.user.role)) throw badRequest("User has an invalid role");
    res.json({ data: { user: publicUser(stored.user), accessToken: createAccessToken(stored.userId, stored.user.role), refreshToken: nextToken } });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  try {
    const input = refreshSchema.safeParse(req.body);
    if (input.success) {
      await prisma.refreshToken.updateMany({ where: { tokenHash: hashToken(input.data.refreshToken), revokedAt: null }, data: { revokedAt: new Date() } });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.auth!.userId },
      include: { clientProfile: true, freelancerProfile: true }
    });
    if (!user) throw unauthorized();
    res.json({ data: { user: { ...publicUser(user), clientProfile: user.clientProfile, freelancerProfile: user.freelancerProfile } } });
  } catch (error) {
    next(error);
  }
});
