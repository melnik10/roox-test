import React, {FC, useState} from 'react';
import {authRoutes, routes} from "./index";
import {Route, Routes} from "react-router-dom";

const AppRoutes:FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false)

    return (
        <Routes>
            {isAuth &&
                authRoutes.map((route) =>
                    <Route path={route.path}
                           element={route.element}
                           key={route.path}/>
                )
            }
            {
                routes.map((route) =>
                    <Route path={route.path}
                           element={route.element}
                           key={route.path}/>
                )
            }
        </Routes>
    );
};

export default AppRoutes;