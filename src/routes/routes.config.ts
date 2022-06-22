import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const Signup = lazy(() => import("../pages/auth/signup/singup"))
// const EditProfile = lazy(() => import("../pages/auth/EditUser/edituser"))
const EditProfile = lazy(() => import("../pages/EditUser/Edituser"))
const Forgotpassword = lazy(() => import("../pages/auth/Forgotpassword/Forgotpassword"))
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword/ResetPassword"))
const Saved = lazy(() => import("../pages/Saved"))
/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  signup: "/auth/signup",
  forgotpassword: "/auth/forgotpassword",
  editprofile:'/editprofile',
  resetpassword: "/auth/resetpassword",
  saved:'/saved'
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
  {
    path: paths.editprofile,
    component: EditProfile,
  },
  {
    path: paths.resetpassword,
    component: ResetPassword,
  },
  {
    path: paths.saved,
    component: Saved,
  },
];
