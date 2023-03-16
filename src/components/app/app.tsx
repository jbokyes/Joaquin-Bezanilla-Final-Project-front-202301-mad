import { AppRouter } from "../app-router/app-router";
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

export function App() {
  return (
    <>
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
      <AppRouter></AppRouter>
    </>
  );
}

export default App;
