import { Router } from "express";
import { badRequest, forbidden, notFound } from "../lib/errors.js";
import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../prisma.js";

const engagementInclude = { project: { include: { category: true } }, proposal: true, client: { select: { id: true, email: true, clientProfile: true } }, freelancer: { select: { id: true, email: true, freelancerProfile: true } } } as const;

const canAccess = (engagement: { clientId: string; freelancerId: string }, userId: string, role: string) => role === "ADMIN" || engagement.clientId === userId || engagement.freelancerId === userId;

export const engagementsRouter = Router();

engagementsRouter.get("/", requireAuth, async (req, res, next) => {
  try {
    const where = req.auth!.role === "CLIENT" ? { clientId: req.auth!.userId } : req.auth!.role === "FREELANCER" ? { freelancerId: req.auth!.userId } : {};
    const engagements = await prisma.engagement.findMany({ where, include: engagementInclude, orderBy: { updatedAt: "desc" } });
    res.json({ data: engagements });
  } catch (error) {
    next(error);
  }
});

engagementsRouter.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const engagement = await prisma.engagement.findUnique({ where: { id: String(req.params.id) }, include: engagementInclude });
    if (!engagement) throw notFound("Engagement not found");
    if (!canAccess(engagement, req.auth!.userId, req.auth!.role)) throw forbidden();
    res.json({ data: engagement });
  } catch (error) {
    next(error);
  }
});

engagementsRouter.post("/:id/submit", requireAuth, async (req, res, next) => {
  try {
    const engagement = await prisma.engagement.findUnique({ where: { id: String(req.params.id) } });
    if (!engagement) throw notFound("Engagement not found");
    if (req.auth!.role !== "FREELANCER" || engagement.freelancerId !== req.auth!.userId) throw forbidden();
    if (engagement.status !== "ACTIVE") throw badRequest("Only active engagements can be submitted for review");
    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.engagement.update({ where: { id: engagement.id }, data: { status: "SUBMITTED_FOR_REVIEW" }, include: engagementInclude });
      await tx.notification.create({ data: { userId: engagement.clientId, type: "ENGAGEMENT_SUBMITTED", title: "Work submitted for review", body: "A freelancer submitted work for your review.", resourceType: "ENGAGEMENT", resourceId: engagement.id } });
      return result;
    });
    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
});

engagementsRouter.post("/:id/complete", requireAuth, async (req, res, next) => {
  try {
    const engagement = await prisma.engagement.findUnique({ where: { id: String(req.params.id) } });
    if (!engagement) throw notFound("Engagement not found");
    if (req.auth!.role !== "CLIENT" || engagement.clientId !== req.auth!.userId) throw forbidden();
    if (engagement.status !== "SUBMITTED_FOR_REVIEW") throw badRequest("Only submitted engagements can be completed");
    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.engagement.update({ where: { id: engagement.id }, data: { status: "COMPLETED", completedAt: new Date() }, include: engagementInclude });
      await tx.project.update({ where: { id: engagement.projectId }, data: { status: "COMPLETED" } });
      await tx.notification.create({ data: { userId: engagement.freelancerId, type: "ENGAGEMENT_COMPLETED", title: "Engagement completed", body: "Your engagement has been marked complete.", resourceType: "ENGAGEMENT", resourceId: engagement.id } });
      return result;
    });
    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
});

engagementsRouter.post("/:id/cancel", requireAuth, async (req, res, next) => {
  try {
    const engagement = await prisma.engagement.findUnique({ where: { id: String(req.params.id) } });
    if (!engagement) throw notFound("Engagement not found");
    if (!canAccess(engagement, req.auth!.userId, req.auth!.role)) throw forbidden();
    if (!["ACTIVE", "SUBMITTED_FOR_REVIEW"].includes(engagement.status)) throw badRequest("This engagement cannot be cancelled");
    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.engagement.update({ where: { id: engagement.id }, data: { status: "CANCELLED" }, include: engagementInclude });
      await tx.project.update({ where: { id: engagement.projectId }, data: { status: "CLOSED" } });
      const recipientId = req.auth!.userId === engagement.clientId ? engagement.freelancerId : engagement.clientId;
      await tx.notification.create({ data: { userId: recipientId, type: "ENGAGEMENT_CANCELLED", title: "Engagement cancelled", body: "An engagement has been cancelled.", resourceType: "ENGAGEMENT", resourceId: engagement.id } });
      return result;
    });
    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
});
