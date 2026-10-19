
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("queuelessUser") || "null"
    );

    if (
      !savedUser ||
      savedUser.email !== email ||
      savedUser.password !== password
    ) {
      setError("Invalid credentials. Please create an account first.");
      return;
    }

    navigate("/");
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p>Sign in to your QueueLess Campus account.</p>

        {error && <p role="alert">{error}</p>}

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="primary-button">
          Sign In
        </button>

        <p>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </main>
  );
}
