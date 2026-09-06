import { Router } from "express";
import { z } from "zod";
import { forbidden, notFound } from "../lib/errors.js";
import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../prisma.js";

const messageSchema = z.object({ body: z.string().trim().min(1).max(5000) });

const participant = (conversationId: string, userId: string) => prisma.conversationParticipant.findUnique({ where: { conversationId_userId: { conversationId, userId } } });

export const conversationsRouter = Router();

conversationsRouter.get("/", requireAuth, async (req, res, next) => {
  try {
    const conversations = await prisma.conversation.findMany({ where: { participants: { some: { userId: req.auth!.userId } } }, include: { participants: { include: { user: { select: { id: true, email: true, clientProfile: true, freelancerProfile: true } } } }, messages: { orderBy: { createdAt: "desc" }, take: 1 } }, orderBy: { updatedAt: "desc" } });
    res.json({ data: conversations });
  } catch (error) {
    next(error);
  }
});

conversationsRouter.get("/:id/messages", requireAuth, async (req, res, next) => {
  try {
    const conversationId = String(req.params.id);
    if (!(await participant(conversationId, req.auth!.userId))) throw forbidden();
    const messages = await prisma.message.findMany({ where: { conversationId }, include: { sender: { select: { id: true, email: true, clientProfile: true, freelancerProfile: true } } }, orderBy: { createdAt: "asc" } });
    res.json({ data: messages });
  } catch (error) {
    next(error);
  }
});

conversationsRouter.post("/:id/messages", requireAuth, async (req, res, next) => {
  try {
    const conversationId = String(req.params.id);
    if (!(await participant(conversationId, req.auth!.userId))) throw forbidden();
    const input = messageSchema.parse(req.body);
    const message = await prisma.$transaction(async (tx) => {
      const created = await tx.message.create({ data: { conversationId, senderId: req.auth!.userId, body: input.body }, include: { sender: { select: { id: true, email: true, clientProfile: true, freelancerProfile: true } } } });
      await tx.conversation.update({ where: { id: conversationId }, data: { updatedAt: new Date() } });
      return created;
    });
    res.status(201).json({ data: message });
  } catch (error) {
    next(error);
  }
});
