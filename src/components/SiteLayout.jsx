import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import api from "../services/http";

export default function SiteLayout() {
  const [waking, setWaking] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // only do this once per tab
    if (sessionStorage.getItem("serverWarmed")) return;

    // only show banner in production (e.g., GitHub Pages)
    if (typeof import.meta !== "undefined" && import.meta.env?.PROD) {
      setWaking(true);
      setMessage("Waking server… this can take ~20–60s on first load.");

      // NOTE: path starts with /api (see http.js base below)
      const ping = api.get("/api/rockets", { params: { _warmup: 1, limit: 1 } });

      const soften = setTimeout(() => setMessage("Still waking… almost there."), 15000);
      const hardStop = setTimeout(() => setWaking(false), 60000); // give it 60s

      ping
        .then(() => {
          sessionStorage.setItem("serverWarmed", "1");
          setWaking(false);
        })
        .catch(() => {
          // request can fail (timeout/CORS) but it still wakes the dyno
          // keep banner until hardStop hides it
        })
        .finally(() => clearTimeout(soften));

      return () => {
        clearTimeout(soften);
        clearTimeout(hardStop);
      };
    }
  }, []);

  return (
    <>
      <NavBar />
      {waking && (
        <div role="status" aria-live="polite" className="wake-banner">
          {message}
        </div>
      )}
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
