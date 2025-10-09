import Rockets from "./pages/Rockets";
import Login from "./components/login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


function App() {
  return (
    <>
        <BrowserRouter>
          <nav>
            <Link to="/">Login</Link>
            <Link to="/Rockets">Rockets</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Rockets" element={<Rockets />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;