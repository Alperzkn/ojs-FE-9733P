import { Outlet } from "@mui/icons-material";
import NavbarComponent from "../components/layout/NavBar";

export default function RootLayout() {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>
  );
}
