import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./services/auth.jsx";
import { FavoritesProvider } from "./services/favorites.jsx";

const basename = import.meta.env.BASE_URL;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </AuthProvider>
  </BrowserRouter>
);
