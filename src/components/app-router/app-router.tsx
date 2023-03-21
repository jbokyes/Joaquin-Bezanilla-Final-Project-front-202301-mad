import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import About from "../about/about";
import { MenuOption, menuOptions } from "../app/app";
import Details from "../details/details";
import Favourites from "../favourites/favourites";
import Login from "../login/login";
import Register from "../register/register";

const Home = lazy(() => import("../home/home"));

export function AppRouter() {
  const navMenuOptions: MenuOption[] = menuOptions;
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<Home></Home>}></Route>
        <Route path={navMenuOptions[0].path} element={<Home></Home>}></Route>
        <Route path={navMenuOptions[1].path} element={<About></About>}></Route>
        <Route path={navMenuOptions[2].path} element={<Login></Login>}></Route>
        <Route
          path={navMenuOptions[3].path}
          element={<Register></Register>}
        ></Route>
        <Route
          path={navMenuOptions[4].path}
          element={<Favourites></Favourites>}
        ></Route>
        <Route path={"/details/:id"} element={<Details></Details>}></Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
