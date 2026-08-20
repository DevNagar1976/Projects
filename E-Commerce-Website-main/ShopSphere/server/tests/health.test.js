import assert from "node:assert/strict";
import test from "node:test";
import request from "supertest";
import { app } from "../src/app.js";

test("GET /api/health returns API status", async () => {
  const response = await request(app).get("/api/health");
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.match(response.body.message, /running/i);
});

test("unknown API routes return JSON 404", async () => {
  const response = await request(app).get("/api/not-a-route");
  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
});
