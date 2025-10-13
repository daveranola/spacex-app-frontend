import { createContext, useContext, useEffect, useState } from "react";
import { me as apiMe, login as apiLogin, logout as apiLogout } from "./login";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load current session on startup
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await apiMe(); // returns JSON or throws
        if (!cancelled) setUser(data || null);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setAuthLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Login: call /auth/login, then /auth/me to populate user
  const login = async (creds) => {
    await apiLogin(creds);          // cookie/session is set server-side
    const me = await apiMe();       // fetch the user JSON for UI state
    setUser(me || null);
    return me;
  };

  const logout = async () => {
    try { await apiLogout(); } finally { setUser(null); }
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
