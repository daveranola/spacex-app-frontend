import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRockets } from "../services/spacex.js";
import { useAuth } from "../services/auth.jsx";
import { useFavorites } from "../services/favorites.jsx";

function SkeletonCard() {
  return (
    <div className="card-rocket skeleton">
      <div className="card-rocket__media sk-img" />
      <div className="card-rocket__content">
        <div className="card-rocket__header"><div className="sk-line w-70" /><div className="sk-badge" /></div>
        <div className="sk-line w-90" /><div className="sk-line w-80" /><div className="sk-line w-60" />
        <div className="card-rocket__stats"><div className="stat-skeleton" /><div className="stat-skeleton" /><div className="stat-skeleton" /></div>
      </div>
    </div>
  );
}

export default function Favorites() {
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ids } = useFavorites();

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/login"); return; }
    getAllRockets().then(setItems).finally(() => setLoading(false));
  }, [authLoading, user, navigate]);

  const favs = useMemo(() => items.filter((r) => ids.includes(r.id)), [items, ids]);

  if (authLoading) return null;

  return (
    <section className="rockets-page">
      <div className="rockets-header">
        <div className="rockets-title-section">
          <h1 className="rockets-title">Your Favorites</h1>
          <p className="rockets-subtitle">Only rockets you starred while logged in</p>
        </div>
      </div>

      {loading ? (
        <div className="rockets-grid">{Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}</div>
      ) : favs.length ? (
        <div className="rockets-grid">
          {favs.map((rocket) => (
            <article key={rocket.id} className="card-rocket">
              <Link to={`/rockets/${rocket.id}`} state={{ rocket }} className="card-rocket__media">
                <img src={rocket.flickr_images?.[0]} alt={rocket.name} loading="lazy" />
                <div className="card-rocket__overlay"><span className="view-details">View Details →</span></div>
                <div className={`card-rocket__status ${rocket.active ? 'active' : 'retired'}`}>
                  <span className="status-dot"></span>{rocket.active ? "ACTIVE" : "RETIRED"}
                </div>
              </Link>
              <div className="card-rocket__content">
                <div className="card-rocket__header">
                  <Link to={`/rockets/${rocket.id}`} state={{ rocket }} className="card-rocket__title">{rocket.name}</Link>
                </div>
                <p className="card-rocket__description">{rocket.description}</p>
                <div className="card-rocket__stats">
                  <div className="stat"><div className="stat-value">{rocket.height?.meters ?? "—"}m</div><div className="stat-label">Height</div></div>
                  <div className="stat"><div className="stat-value">{rocket.diameter?.meters ?? "—"}m</div><div className="stat-label">Diameter</div></div>
                  <div className="stat"><div className="stat-value">{rocket.cost_per_launch ? `$${(rocket.cost_per_launch/1_000_000).toFixed(0)}M` : "—"}</div><div className="stat-label">Cost/Launch</div></div>
                </div>
                <div className="card-rocket__actions">
                  <Link to={`/rockets/${rocket.id}`} state={{ rocket }} className="btn btn--ghost">Explore Rocket</Link>
                  {rocket.wikipedia && <a href={rocket.wikipedia} target="_blank" rel="noreferrer" className="btn btn--outline">Wikipedia</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h3>No favorites yet</h3>
          <p>Go to <Link to="/rockets">Rockets</Link> and star a few.</p>
        </div>
      )}
    </section>
  );
}
