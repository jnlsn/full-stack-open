const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import { BlogForm } from "./BlogForm";

globalThis.fetch = vi
  .fn()
  .mockResolvedValue({
    json: () => new Promise((resolve) => resolve({ title: "" })),
  });

describe("BlogForm", () => {
  const post = {
    title: "My Blog",
    id: "1",
    author: "Harpo",
    url: "linky",
    user: { username: "foo" },
  };
  const onBlogChange = vi.fn();

  test("success callback", async () => {
    const user = userEvent.setup();
    render(<BlogForm user={user} onSuccess={onBlogChange} />);
    await user.type(screen.getByLabelText(/title/i), post.title);
    await user.type(screen.getByLabelText(/url/i), post.url);
    await user.click(screen.getByRole("button", { name: /submit/i }));
    expect(onBlogChange).toHaveBeenCalledWith(
      expect.objectContaining({
        title: post.title,
        url: post.url,
      })
    );
  });
});
