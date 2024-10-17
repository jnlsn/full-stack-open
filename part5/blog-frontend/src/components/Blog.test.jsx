const { render, screen } = require("@testing-library/react");
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";

describe("Blog", () => {
  const user = { username: "foo", name: "Foo", token: "ttttt", likes: 1 };
  const post = {
    title: "My Blog",
    id: "1",
    author: "Harpo",
    url: "linky",
    user: { username: "foo" },
  };
  const onBlogChange = vi.fn();

  test("renders only the title at first", async () => {
    const user = userEvent.setup();
    render(<Blog user={user} post={post} onBlogChange={onBlogChange} />);
    expect(screen.getByText(/my blog/i)).toBeVisible();
    expect(screen.getByText(/likes/i)).not.toBeVisible();
    await user.click(screen.getByText(/show/i));
    expect(screen.getByText(/likes/i)).toBeVisible();
    expect(screen.getByText(post.url)).toBeVisible();
  });
});
