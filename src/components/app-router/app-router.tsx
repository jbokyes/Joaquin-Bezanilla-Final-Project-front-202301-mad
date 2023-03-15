import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import About from "../about/about";
import { MenuOption } from "../app/app";
import Favourites from "../favourites/favourites";
import Login from "../login/login";
import Register from "../register/register";

const Home = lazy(() => import("../home/home"));

type AppRouterProps = {
  menuOptions: MenuOption[];
};

export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<Home></Home>}></Route>
        <Route path={menuOptions[0].path} element={<Home></Home>}></Route>
        <Route path={menuOptions[1].path} element={<About></About>}></Route>
        <Route path={menuOptions[2].path} element={<Login></Login>}></Route>
        <Route
          path={menuOptions[3].path}
          element={<Register></Register>}
        ></Route>
        <Route
          path={menuOptions[4].path}
          element={<Favourites></Favourites>}
        ></Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
