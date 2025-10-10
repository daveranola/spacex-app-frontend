import { useState } from "react";
import { signup } from "../services/signup";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Username is required.");
      return;
    }
    if (!email.trim()) {
      alert("Email is required.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await signup({ email: email.trim().toLowerCase(), username: username.trim(), password });
      // clear sensitive input quickly
      setPassword("");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data || "Sign up failed";
      alert(typeof msg === "string" ? msg : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
}
