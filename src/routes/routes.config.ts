import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const Signup = lazy(() => import("../pages/auth/signup/singup"))
const Forgotpassword = lazy(() => import("../pages/auth/Forgotpassword/Forgotpassword"))
/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  signup: "/auth/signup",
  forgotpassword: "/auth/forgotpassword"
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.signup,
    component: Signup,
  },
  {
    path: paths.forgotpassword,
    component: Forgotpassword,
  },
];
