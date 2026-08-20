import assert from "node:assert/strict";
import test from "node:test";
import { calculateCartTotals } from "../src/utils/cartTotals.js";

test("calculates subtotal, 5% delivery, and total", () => {
  assert.deepEqual(
    calculateCartTotals([
      { price: 1000, quantity: 2 },
      { price: 500, quantity: 1 },
    ]),
    { subtotal: 2500, delivery: 125, total: 2625 },
  );
});

test("returns zero totals for an empty cart", () => {
  assert.deepEqual(calculateCartTotals([]), { subtotal: 0, delivery: 0, total: 0 });
});
