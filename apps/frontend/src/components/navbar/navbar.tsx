import { Logout } from "@navikt/ds-icons/cjs";
import { Normaltekst, Undertekst, Element } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import { Link, useLocation } from "wouter";
import style from "./navbar.module.less";
import DiaSightLogo from "../../assets/logo.svg";

export const Navbar: FC = () => {

    const [location, setLocation] = useLocation();

    return (
        <div className={style.wrapper}>
            <img src={DiaSightLogo} alt="" />
            <div className={style.identifier}>
                <Undertekst>DR. NYSTØL</Undertekst>
                <Undertekst>OVERLEGE</Undertekst>
                <Undertekst>OSLO KLINIKK</Undertekst>
            </div>
            <div className={style.options}>
                <Link href="/oversikt">
                    <Normaltekst className={`${location.includes("/oversikt") ? style.active : null}`}>Oversikt</Normaltekst>
                </Link>
                <Link href="/pasient">
                    <Normaltekst className={`${location.includes("/pasient") ? style.active : null}`}>Pasient</Normaltekst>
                </Link>
                <Link href="/timeplan">
                    <Normaltekst className={`${location.includes("/timeplan") ? style.active : null}`}>Timeplan</Normaltekst>
                </Link>
                <Link href="/inbox">
                    <Normaltekst className={`${location.includes("/inbox") ? style.active : null}`}>Inbox</Normaltekst>
                </Link>
                <Link href="/instillinger">
                    <Normaltekst className={`${location.includes("/instillinger") ? style.active : null}`}>Instillinger</Normaltekst>
                </Link>
            </div>
            <div className={style.session}>
                <Element>Logg ut</Element>
                <Logout />
            </div>
        </div>);
};
