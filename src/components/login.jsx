import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/login"; // should export function login({ email, username, password })

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // require at least one identifier
    if (!email.trim() && !username.trim()) {
      alert("Enter email or username.");
      return;
    }

    try {
      await login({ email: email.trim(), username: username.trim(), password });
      navigate("/rockets"); // adjust to your actual route
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
