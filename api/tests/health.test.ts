import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("health", () => {
  it("reports the API is healthy", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({ service: "archer-api", status: "ok" });
  });
});
