import { Router } from "express";
import { prisma } from "../prisma.js";

export const referenceRouter = Router();

referenceRouter.get("/categories", async (_req, res, next) => {
  try {
    const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
    res.json({ data: categories });
  } catch (error) {
    next(error);
  }
});

referenceRouter.get("/skills", async (_req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { name: "asc" } });
    res.json({ data: skills });
  } catch (error) {
    next(error);
  }
});
