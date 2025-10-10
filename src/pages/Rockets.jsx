import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllRockets } from "../services/spacex";

function SkeletonCard() {
  return (
    <div className="card-rocket skeleton">
      <div className="card-rocket__media sk-img"></div>
      <div className="card-rocket__content">
        <div className="card-rocket__header">
          <div className="sk-line w-70"></div>
          <div className="sk-badge"></div>
        </div>
        <div className="sk-line w-90"></div>
        <div className="sk-line w-80"></div>
        <div className="sk-line w-60"></div>
        <div className="card-rocket__stats">
          <div className="stat-skeleton"></div>
          <div className="stat-skeleton"></div>
          <div className="stat-skeleton"></div>
        </div>
      </div>
    </div>
  );
}

export default function Rockets() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllRockets()
      .then(setItems)
      .catch(setErr)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (r) =>
        r.name?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q)
    );
  }, [items, query]);

  if (err) {
    const msg = String(err?.message || err);
    return (
      <div className="error-state">
        <div className="error-icon">⚠️</div>
        <h2>Launch Sequence Interrupted</h2>
        <p>{msg}</p>
        <button className="btn btn--primary" onClick={() => location.reload()}>
          Reinitialize Systems
        </button>
      </div>
    );
  }

  return (
    <section className="rockets-page">
      <div className="rockets-header">
        <div className="rockets-title-section">
          <h1 className="rockets-title">SpaceX Rockets</h1>
          <p className="rockets-subtitle">Explore the fleet powering humanity's future in space</p>
        </div>
        
        <div className="rockets-search">
          <div className="search-container">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              className="search-input"
              placeholder="Search rockets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery("")}>
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="rockets-grid">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="rockets-grid">
          {filtered.map((rocket) => (
            <RocketCard key={rocket.id} rocket={rocket} />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No rockets found</h3>
          <p>No rockets match "{query}". Try adjusting your search.</p>
        </div>
      )}
    </section>
  );
}

function RocketCard({ rocket }) {
  return (
    <article className="card-rocket">
      <Link
        to={`/rockets/${rocket.id}`}
        state={{ rocket }}
        className="card-rocket__media"
      >
        <img
          src={rocket.flickr_images?.[0]}
          alt={rocket.name}
          loading="lazy"
        />
        <div className="card-rocket__overlay">
          <span className="view-details">View Details →</span>
        </div>
        <div className={`card-rocket__status ${rocket.active ? 'active' : 'retired'}`}>
          <span className="status-dot"></span>
          {rocket.active ? "ACTIVE" : "RETIRED"}
        </div>
      </Link>

      <div className="card-rocket__content">
        <div className="card-rocket__header">
          <Link
            to={`/rockets/${rocket.id}`}
            state={{ rocket }}
            className="card-rocket__title"
          >
            {rocket.name}
          </Link>
        </div>

        <p className="card-rocket__description">{rocket.description}</p>

        <div className="card-rocket__stats">
          <div className="stat">
            <div className="stat-value">{rocket.height?.meters ?? "—"}m</div>
            <div className="stat-label">Height</div>
          </div>
          <div className="stat">
            <div className="stat-value">{rocket.diameter?.meters ?? "—"}m</div>
            <div className="stat-label">Diameter</div>
          </div>
          <div className="stat">
            <div className="stat-value">
              {rocket.cost_per_launch ? `$${(rocket.cost_per_launch / 1000000).toFixed(0)}M` : "—"}
            </div>
            <div className="stat-label">Cost/Launch</div>
          </div>
        </div>

        <div className="card-rocket__actions">
          <Link
            to={`/rockets/${rocket.id}`}
            state={{ rocket }}
            className="btn btn--ghost"
          >
            Explore Rocket
          </Link>
          {rocket.wikipedia && (
            <a 
              href={rocket.wikipedia} 
              target="_blank" 
              rel="noreferrer"
              className="btn btn--outline"
            >
              Wikipedia
            </a>
          )}
        </div>
      </div>
    </article>
  );
}