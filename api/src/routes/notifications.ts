import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { notFound } from "../lib/errors.js";
import { prisma } from "../prisma.js";

export const notificationsRouter = Router();

notificationsRouter.get("/", requireAuth, async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({ where: { userId: req.auth!.userId }, orderBy: { createdAt: "desc" }, take: 100 });
    res.json({ data: notifications });
  } catch (error) {
    next(error);
  }
});

notificationsRouter.post("/:id/read", requireAuth, async (req, res, next) => {
  try {
    const notification = await prisma.notification.findFirst({ where: { id: String(req.params.id), userId: req.auth!.userId } });
    if (!notification) throw notFound("Notification not found");
    const updated = await prisma.notification.update({ where: { id: notification.id }, data: { readAt: notification.readAt ?? new Date() } });
    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
});
