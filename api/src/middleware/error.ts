import type { ErrorRequestHandler, RequestHandler } from "express";
import { z } from "zod";
import { Prisma } from "../../generated/prisma/client.js";
import { HttpError } from "../lib/errors.js";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new HttpError(404, "NOT_FOUND", `Route ${req.method} ${req.path} not found`));
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      error: { code: error.code, message: error.message, ...(error.details ? { details: error.details } : {}) }
    });
    return;
  }

  if (error instanceof z.ZodError) {
    res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "One or more fields are invalid", details: error.flatten() } });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    res.status(409).json({ error: { code: "CONFLICT", message: "A record with this value already exists" } });
    return;
  }

  console.error({ requestId: req.requestId, error });
  res.status(500).json({ error: { code: "INTERNAL_SERVER_ERROR", message: "An unexpected error occurred" } });
};
