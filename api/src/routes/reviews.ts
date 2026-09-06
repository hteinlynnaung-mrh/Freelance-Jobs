import { Router } from "express";
import { z } from "zod";
import { badRequest, conflict, forbidden, notFound } from "../lib/errors.js";
import { requireAuth } from "../middleware/auth.js";
import { prisma } from "../prisma.js";

const reviewSchema = z.object({ engagementId: z.string().cuid(), subjectId: z.string().cuid(), rating: z.number().int().min(1).max(5), comment: z.string().trim().max(2000).optional() });

export const reviewsRouter = Router();

reviewsRouter.post("/", requireAuth, async (req, res, next) => {
  try {
    const input = reviewSchema.parse(req.body);
    const engagement = await prisma.engagement.findUnique({ where: { id: input.engagementId } });
    if (!engagement) throw notFound("Engagement not found");
    if (engagement.status !== "COMPLETED") throw badRequest("Reviews are available only after completion");
    if (![engagement.clientId, engagement.freelancerId].includes(req.auth!.userId)) throw forbidden();
    const expectedSubject = req.auth!.userId === engagement.clientId ? engagement.freelancerId : engagement.clientId;
    if (input.subjectId !== expectedSubject) throw badRequest("Reviews must be written for the other participant");
    const existing = await prisma.review.findUnique({ where: { engagementId_authorId: { engagementId: engagement.id, authorId: req.auth!.userId } } });
    if (existing) throw conflict("You have already reviewed this engagement");
    const review = await prisma.review.create({ data: { engagementId: engagement.id, authorId: req.auth!.userId, subjectId: input.subjectId, rating: input.rating, comment: input.comment }, include: { author: { select: { id: true, email: true } }, subject: { select: { id: true, email: true } } } });
    res.status(201).json({ data: review });
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/users/:userId", async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({ where: { subjectId: String(req.params.userId), isVisible: true }, include: { author: { select: { id: true, email: true } } }, orderBy: { createdAt: "desc" } });
    res.json({ data: reviews });
  } catch (error) {
    next(error);
  }
});
