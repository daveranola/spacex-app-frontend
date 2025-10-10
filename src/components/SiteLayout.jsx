import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function SiteLayout() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}