import React from "react";
import { Redirect } from "react-router-dom";

import { DefaultLayout } from "./layouts";

import Home from "./views/Home";
import User from "./views/Users/User";
import Profile from "./views/Users/Profile";

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
    path: "/vip",
    layout: DefaultLayout,
    component: Home
  }
];
