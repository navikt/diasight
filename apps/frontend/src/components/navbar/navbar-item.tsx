import { Link } from "react-router-dom";
import style from "./navbar.module.less";
import { Element } from "nav-frontend-typografi";
import React, { FC, ReactElement } from "react";
import { useLocation } from "react-router";

interface Params {
    path: string;
    name: string;
    icon: ReactElement;
}

export const NavbarItem: FC<Params> = ({ path, name, icon }) => {
    const { pathname } = useLocation();
    return (
        <Link to={path}>
            <div className={pathname.includes(path) ? style.active : undefined}>
                {icon}
                <Element>{name}</Element>
            </div>
        </Link>
    );
};
