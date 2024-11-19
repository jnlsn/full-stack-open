const { test, expect, beforeEach, describe } = require("@playwright/test");

const user = {
  name: "Matti Luukkainen",
  username: "mluukkai",
  password: "salainen",
};

describe("Blog App Login", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: user,
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel(/username/i).fill(user.username);
      await page.getByLabel(/password/i).fill(user.password);
      await page.getByRole("button", { name: "submit" }).click();
      await expect(page.getByText(`${user.name} is logged in`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel(/username/i).fill(user.username);
      await page.getByLabel(/password/i).fill("flubbedit");
      await page.getByRole("button", { name: "submit" }).click();
      await expect(page.getByText(/could not sign in/i)).toBeVisible();
    });
  });
});
