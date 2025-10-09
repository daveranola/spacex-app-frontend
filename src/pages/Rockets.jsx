import { useEffect, useState } from "react";
import { getAllRockets } from "../services/spacex";

export default function Rockets() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllRockets()
      .then(setItems)
      .catch(setErr)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (err) return <p>Error: {String(err.message || err)}</p>;

  return (
    <ul>
      {items.map((l) => (
        <li key={l.id}>
          <h3>{l.name}</h3>
          <img
            src={l.flickr_images[0]}
            alt={l.name}
            style={{ width: "300px", borderRadius: "8px" }}
          />
          <p>Height: {l.height.meters} m</p>
          <p>Diameter: {l.diameter.meters}</p>
          <p>Active: {l.active ? "Yes" : "No"}</p>
          <p>Cost per launch: ${l.cost_per_launch.toLocaleString()}</p>
          <p>{l.description}</p>
        </li>
      ))}
    </ul>
  );
}