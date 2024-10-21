import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/layout/NavBar";

export default function RootLayout() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
}
