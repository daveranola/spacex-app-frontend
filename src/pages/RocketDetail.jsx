import { useEffect, useState, useMemo } from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";

export default function RocketDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const initialRocket = location.state?.rocket || null;

  const [rocket, setRocket] = useState(initialRocket);
  const [loading, setLoading] = useState(!initialRocket);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (initialRocket) return;

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
        if (!res.ok) throw new Error(`Failed to load rocket (${res.status})`);
        const data = await res.json();
        if (!cancelled) setRocket(data);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load rocket");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [id, initialRocket]);

  const images = useMemo(() => rocket?.flickr_images ?? [], [rocket]);

  if (loading) {
    return (
      <section className="rocket-detail">
        <div className="rocket-detail__nav">
          <Link to="/rockets" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to rockets
          </Link>
        </div>
        <div className="rocket-detail__skeleton">
          <div className="skeleton-img-large"></div>
          <div className="skeleton-line w-60"></div>
          <div className="skeleton-line w-80"></div>
          <div className="skeleton-line"></div>
        </div>
      </section>
    );
  }

  if (error || !rocket) {
    return (
      <section className="rocket-detail">
        <div className="rocket-detail__nav">
          <Link to="/rockets" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to rockets
          </Link>
        </div>
        <div className="error-state">
          <svg className="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.5s4.5 2.04 4.5 10.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5zm2 8.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6.31 9.52c-.48-1.23-1.52-4.17-1.67-6.87l-1.13.75c-.56.38-.89 1-.89 1.67V22l3.69-1.48zM20 22v-5.93c0-.67-.33-1.29-.89-1.66l-1.13-.75c-.15 2.69-1.2 5.64-1.67 6.87L20 22z"/>
          </svg>
          <h2>Launch Aborted</h2>
          <p>{error || "Rocket data unavailable"}</p>
          <button className="btn btn--primary" onClick={() => navigate(0)}>
            Retry Launch Sequence
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rocket-detail">
      {/* Navigation */}
      <div className="rocket-detail__nav">
        <Link to="/rockets" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back to rockets
        </Link>
      </div>

      {/* Header with title and status */}
      <header className="rocket-detail__header">
        <div className="rocket-detail__title-section">
          <h1 className="rocket-detail__title">{rocket.name}</h1>
          <div className={`rocket-status ${rocket.active ? 'active' : 'retired'}`}>
            <span className="status-dot"></span>
            {rocket.active ? "Active Mission" : "Mission Complete"}
          </div>
        </div>
        
        {rocket.wikipedia && (
          <a href={rocket.wikipedia} target="_blank" rel="noreferrer" className="wiki-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Wikipedia
          </a>
        )}
      </header>

      {/* Main image gallery */}
      {images.length > 0 && (
        <div className="rocket-gallery">
          <div className="gallery-main">
            <img
              src={images[selectedImage]}
              alt={rocket.name}
              className="gallery-main__img"
            />
          </div>
          
          {images.length > 1 && (
            <div className="gallery-thumbnails">
              {images.slice(0, 6).map((src, i) => (
                <button
                  key={i}
                  className={`thumbnail ${selectedImage === i ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={src} alt={`${rocket.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {rocket.description && (
        <article className="rocket-description">
          <h2 className="section-title">Mission Overview</h2>
          <p className="description-text">{rocket.description}</p>
        </article>
      )}

      {/* Stats Grid */}
      <div className="rocket-stats">
        <div className="stat-card">
          <svg className="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
          <div className="stat-content">
            <h3>First Flight</h3>
            <p>{rocket.first_flight || "—"}</p>
          </div>
        </div>

        <div className="stat-card">
          <svg className="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <div className="stat-content">
            <h3>Origin</h3>
            <p>{rocket.country || "—"}</p>
            <span className="stat-subtitle">{rocket.company || "—"}</span>
          </div>
        </div>

        <div className="stat-card">
          <svg className="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22v2H1v-2zM5.24 8.07l2.83-2.83 14.14 14.14-2.83 2.83L5.24 8.07zM12.32 1l5.66 5.66-2.83 2.83-5.66-5.66L12.32 1zM3.83 9.48l5.66 5.66-2.83 2.83L1 12.31l2.83-2.83z"/>
          </svg>
          <div className="stat-content">
            <h3>Dimensions</h3>
            <p>H: {rocket.height?.meters ?? "—"}m ×  {rocket.diameter?.meters ?? "—"}m</p>
            <span className="stat-subtitle">
              Mass: {rocket.mass?.kg ? `${(rocket.mass.kg / 1000).toLocaleString()} tons` : "—"}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <svg className="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.78-1.18 2.73-3.12 3.16z"/>
          </svg>
          <div className="stat-content">
            <h3>Cost per Launch</h3>
            <p>{rocket.cost_per_launch ? `$${rocket.cost_per_launch.toLocaleString()}` : "—"}</p>
          </div>
        </div>

        <div className="stat-card">
          <svg className="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-2-3.5l6-4.5-6-4.5z"/>
          </svg>
          <div className="stat-content">
            <h3>Success Rate</h3>
            <p>{rocket.success_rate_pct ? `${rocket.success_rate_pct}%` : "—"}</p>
          </div>
        </div>

        <div className="stat-card">
          <svg className="stat-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.5s4.5 2.04 4.5 10.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5zm2 8.5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-6.31 9.52c-.48-1.23-1.52-4.17-1.67-6.87l-1.13.75c-.56.38-.89 1-.89 1.67V22l3.69-1.48zM20 22v-5.93c0-.67-.33-1.29-.89-1.66l-1.13-.75c-.15 2.69-1.2 5.64-1.67 6.87L20 22z"/>
          </svg>
          <div className="stat-content">
            <h3>Engines</h3>
            <p>{rocket.engines?.number ?? "—"} × {rocket.engines?.type || "—"}</p>
            <span className="stat-subtitle">
              {[rocket.engines?.propellant_1, rocket.engines?.propellant_2].filter(Boolean).join(" + ") || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="tech-specs">
        <h2 className="section-title">Technical Specifications</h2>
        <div className="specs-grid">
          <div className="spec-group">
            <h4>Propulsion</h4>
            <div className="spec-item">
              <span>Engine Type</span>
              <span>{rocket.engines?.type || "—"}</span>
            </div>
            <div className="spec-item">
              <span>Engine Layout</span>
              <span>{rocket.engines?.layout || "—"}</span>
            </div>
            <div className="spec-item">
              <span>Engine Version</span>
              <span>{rocket.engines?.version || "—"}</span>
            </div>
          </div>

          <div className="spec-group">
            <h4>Performance</h4>
            <div className="spec-item">
              <span>Thrust to Weight</span>
              <span>{rocket.engines?.thrust_to_weight ? rocket.engines.thrust_to_weight.toFixed(1) : "—"}</span>
            </div>
            <div className="spec-item">
              <span>ISP (Sea Level)</span>
              <span>{rocket.engines?.isp?.sea_level ?? "—"} s</span>
            </div>
            <div className="spec-item">
              <span>ISP (Vacuum)</span>
              <span>{rocket.engines?.isp?.vacuum ?? "—"} s</span>
            </div>
          </div>

          <div className="spec-group">
            <h4>Stages</h4>
            <div className="spec-item">
              <span>First Stage</span>
              <span>{rocket.first_stage?.engines ?? "—"} engines</span>
            </div>
            <div className="spec-item">
              <span>Second Stage</span>
              <span>{rocket.second_stage?.engines ?? "—"} engines</span>
            </div>
            <div className="spec-item">
              <span>Boosters</span>
              <span>{rocket.boosters ?? "0"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}