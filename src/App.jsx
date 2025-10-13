// App.jsx
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/Signup";
import Rockets from "./pages/Rockets";
import SiteLayout from "./components/SiteLayout";
import RocketDetail from "./pages/RocketDetail"; 
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rockets" element={<Rockets />} />
        <Route path="/rockets/:id" element={<RocketDetail />} /> {/* ⬅️ new */}
        <Route path="/favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
