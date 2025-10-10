import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      // TODO: call your backend signup endpoint
      // await api.signup(form)
      alert(`Signup\nname: ${form.name}\nemail: ${form.email}`);
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth">
      <div className="auth-card">
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Join SpaceX Viewer in seconds</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name" name="name" type="text" className="input"
              placeholder="Your name" autoComplete="name"
              value={form.name} onChange={onChange} required
            />
          </div>

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
              placeholder="Create a password" autoComplete="new-password"
              value={form.password} onChange={onChange} required minLength={6}
            />
          </div>

          <div className="field">
            <label htmlFor="confirm">Confirm password</label>
            <input
              id="confirm" name="confirm" type="password" className="input"
              placeholder="Repeat password" autoComplete="new-password"
              value={form.confirm} onChange={onChange} required minLength={6}
            />
          </div>

          <button className="btn btn--primary" disabled={submitting}>
            {submitting ? "Creating…" : "Sign up"}
          </button>
        </form>

        <p className="auth-hint">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </section>
  );
}
