import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // TODO: call your backend auth endpoint
      // await api.login(form.email, form.password)
      alert(`Login\nemail: ${form.email}`);
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth">
      <div className="auth-card">
        <h1 className="auth-title">Log in</h1>
        <p className="auth-subtitle">Welcome back to SpaceX Viewer</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email" name="email" type="email" className="input"
              placeholder="you@example.com" autoComplete="email"
              value={form.email} onChange={onChange} required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password" name="password" type="password" className="input"
              placeholder="••••••••" autoComplete="current-password"
              value={form.password} onChange={onChange} required
            />
          </div>

          <button className="btn btn--primary" disabled={submitting}>
            {submitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="auth-hint">
          Don’t have an account? <a href="/">Sign up</a>
        </p>
      </div>
    </section>
  );
}
