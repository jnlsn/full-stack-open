const { test, expect, beforeEach, describe } = require("@playwright/test");

const user = {
  name: "Matti Luukkainen",
  username: "mluukkai",
  password: "salainen",
};

const otherUser = {
  name: "Chico",
  username: "chico",
  password: "chico",
};

const post = {
  title: "New post",
  author: "Harpo",
  url: "http://fake.foo",
};

describe("Blog App When Logged In", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: user,
    });
    await page.goto("http://localhost:5173");
    await page.getByLabel(/username/i).fill(user.username);
    await page.getByLabel(/password/i).fill(user.password);
    await page.getByRole("button", { name: "submit" }).click();
  });

  test("a new blog can be created", async ({ page }) => {
    await page.getByRole("button", { name: /new post/i }).click();
    await page.getByLabel(/title/i).fill(post.title);
    await page.getByLabel(/author/i).fill(post.author);
    await page.getByLabel(/url/i).fill(post.url);
    await page.getByRole("button", { name: /submit/i }).click();
    await expect(page.getByText(post.title, { exact: true })).toBeVisible();
    await expect(page.getByText(post.author)).not.toBeVisible();
    await page.getByText(/show/i).click();
    await expect(page.getByText(post.author)).toBeVisible();
    await expect(getByText(/likes: 0/i)).toBeVisible();
    await page.getByText(/like/i).click();
    await expect(page.getByText(/likes: 1/i)).toBeVisible();
    await page.getByText(/delete/i).click();
    await expect(page.getByText(post.title, { exact: true })).not.toBeVisible();
  });
});
