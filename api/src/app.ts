import cors from "cors";
import express from "express";
import helmet from "helmet";
import { randomUUID } from "node:crypto";
import { config } from "./config.js";
import { errorHandler, notFoundHandler } from "./middleware/error.js";
import { authRouter } from "./routes/auth.js";
import { healthRouter } from "./routes/health.js";
import { projectsRouter } from "./routes/projects.js";
import { profilesRouter } from "./routes/profiles.js";
import { proposalsRouter } from "./routes/proposals.js";
import { referenceRouter } from "./routes/reference.js";
import { engagementsRouter } from "./routes/engagements.js";
import { conversationsRouter } from "./routes/conversations.js";
import { notificationsRouter } from "./routes/notifications.js";
import { reviewsRouter } from "./routes/reviews.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: config.CORS_ORIGIN.split(",").map((origin) => origin.trim()) }));
app.use(express.json({ limit: "1mb" }));
app.use((req, _res, next) => {
  req.requestId = req.header("x-request-id") ?? randomUUID();
  next();
});
app.use((req, res, next) => {
  res.setHeader("x-request-id", req.requestId);
  next();
});

app.use(healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectsRouter);
app.use("/api/v1/reference", referenceRouter);
app.use("/api/v1/profiles", profilesRouter);
app.use("/api/v1/proposals", proposalsRouter);
app.use("/api/v1/engagements", engagementsRouter);
app.use("/api/v1/conversations", conversationsRouter);
app.use("/api/v1/notifications", notificationsRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use(notFoundHandler);
app.use(errorHandler);
