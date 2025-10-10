import Login from "./components/login";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Rockets from "./pages/Rockets";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rockets" element={<Rockets />} />
    </Routes>
  );
}

export default App;