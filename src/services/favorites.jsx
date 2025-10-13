import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./auth.jsx";

function userKey(user) {
  const id = user?.userId ?? user?.id ?? user?.email ?? "anon";
  return `spx_favs_v1:${id}`;
}

function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
}
function write(key, next) { localStorage.setItem(key, JSON.stringify(next)); }

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const KEY = useMemo(() => userKey(user), [user]);

  const [ids, setIds] = useState(() => read(KEY));

  // Reload when user changes
  useEffect(() => {
    setIds(read(KEY));
  }, [KEY]);

  // cross-tab sync
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setIds(read(KEY));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [KEY]);

  const has = (id) => ids.includes(id);
  const toggle = (id) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      write(KEY, next);
      return next;
    });
  };

  return (
    <FavoritesContext.Provider value={{ ids, has, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
