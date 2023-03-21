import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import About from "../about/about";
import { MenuOption, menuOptions, nonMenuOptions } from "../app/app";
import Add from "../form/add";
import Edit from "../form/edit";

const Home = lazy(() => import("../home/home"));
const Details = lazy(() => import("../details/details"));
const Register = lazy(() => import("../register/register"));
const Login = lazy(() => import("../login/login"));
const Favourites = lazy(() => import("../favourites/favourites"));

export function AppRouter() {
  const navMenuOptions: MenuOption[] = menuOptions;
  const nonNavMenuOptions: MenuOption[] = nonMenuOptions;
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
        <Route
          path={nonNavMenuOptions[0].path}
          element={<Details></Details>}
        ></Route>
        <Route path={nonNavMenuOptions[1].path} element={<Add></Add>}></Route>
        <Route path={nonNavMenuOptions[2].path} element={<Edit></Edit>}></Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
