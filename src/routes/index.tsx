import React from "react";
import UsersLayout from "../components/pages/users/usersLayout";
import UserLayout from "../components/pages/user/userLayout";
import {Navigate} from "react-router-dom";

interface Route {
    path: string,
    element: JSX.Element
}

export const authRoutes: Route[] = []

export const routes: Route[] = [
    {
        path: '/',
        element: <Navigate to={'/users'}/>
    },
    {
        path: '/users',
        element: <UsersLayout/>
    },
    {
        path: '/user/:id',
        element: <UserLayout/>
    },
    {
        path: '*',
        element: <div>404 NOT FOUND</div>,
    },
]
