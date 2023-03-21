import { AppRouter } from "../app-router/app-router";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import "./app.css";

export type MenuOption = {
  label: string;
  path: string;
};
export const menuOptions: MenuOption[] = [
  { label: "Home", path: "/home" },
  { label: "About", path: "/about" },
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
  { label: "Favourites", path: "/favourites" },
];
export const nonMenuOptions: MenuOption[] = [
  { label: "Details", path: "/details/:id" },
  { label: "Add", path: "/add" },
  { label: "Edit", path: "/edit/:id" },
];

export function App() {
  return (
    <>
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
      <AppRouter></AppRouter>
      <Footer></Footer>
    </>
  );
}

export default App;
