import { useEffect, useState } from "react";
import { listUpcomingLaunches } from "../services/spacex";

export default function Launches() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listUpcomingLaunches()
      .then(setItems)
      .catch(setErr)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (err) return <p>Error: {String(err.message || err)}</p>;

  return (
    <ul>
      {items.map((l) => (
        <li key={l.id}>{l.name}</li>
      ))}
    </ul>
  );
}