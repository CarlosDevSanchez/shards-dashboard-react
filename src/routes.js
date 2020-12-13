import React from "react";
import { Redirect } from "react-router-dom";

import { DefaultLayout } from "./layouts";

import Home from "./views/Home";
import Category from "./views/Category";
import User from "./views/Users/User";
import Profile from "./views/Users/Profile";
import PerfilPublico from "./views/Users/PerfilPublico";

export default [
  {
    path: "/",
    exact: true,
    layout: Home,
    component: () => <Redirect to="/home" />
  },
  {
    path: "/home",
    layout: Home,
    component: Home
  },
  {
    path: "/user/index",
    layout: User,
    component: User
  },
  {
    path: "/user/profile",
    layout: Profile,
    component: Profile
  },
  {
    path: "/user/profile_public",
    layout: PerfilPublico,
    component: PerfilPublico
  },
  {
    path: "/category",
    layout: Category,
    component: Category
  }
];
