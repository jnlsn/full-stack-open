import * as React from "react";

export const LoginForm = ({ setUser }) => {
  const [message, setMessage] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        fetch("/api/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.get("username"),
            password: data.get("password"),
          }),
        })
          .then((res) => {
            if (res.status !== 200) {
              throw new Error("unauthorized");
            }
            return res.json();
          })
          .then((user) => {
            window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
            setUser(user);
          })
          .catch(() => {
            setMessage("could not sign in");
          });
      }}
    >
      <fieldset>
        <legend>Login</legend>
        <div>
          <label for="username">Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        {Boolean(message) && (
          <p role="alert" aria-live="assertive">
            {message}
          </p>
        )}
        <button type="submit">Submit</button>
      </fieldset>
    </form>
  );
};
