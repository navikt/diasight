import { Clock, CoApplicant, Email, Logout, Settings, System } from "@navikt/ds-icons/cjs";
import { Normaltekst, Undertekst, Element, Undertittel } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import { Link, useLocation } from "wouter";
import style from "./navbar.module.less";
import DiaSightLogo from "../../assets/logo.svg";
import DocProfilePicture from "../../assets/doc.png";

export const Navbar: FC = () => {
    const [location, setLocation] = useLocation();

    return (
        <div className={style.wrapper}>
            <img src={DiaSightLogo} alt="" />
            <div className={style.identifier}>
                <img src={DocProfilePicture} alt="" />
                <Undertittel>Dr. Nystøl</Undertittel>
                <Undertekst>Overlege</Undertekst>
                <Undertekst>Oslo legekontor</Undertekst>
            </div>
            <div className={style.options}>
                <Link href="/oversikt">
                    <div className={`${location.includes("/oversikt") ? style.active : null}`}>
                        <System />
                        <Element>Oversikt</Element>
                    </div>
                </Link>
                <Link href="/pasient">
                    <div className={`${location.includes("/pasient") ? style.active : null}`}>
                        <CoApplicant />
                        <Element>Pasient</Element>
                    </div>
                </Link>
                <Link href="/timeplan">
                    <div className={`${location.includes("/timeplan") ? style.active : null}`}>
                        <Clock />
                        <Element>Timeplan</Element>
                    </div>
                </Link>
                <Link href="/inbox">
                    <div className={`${location.includes("/inbox") ? style.active : null}`}>
                        <Email />
                        <Element>Inbox</Element>
                    </div>
                </Link>
                <Link href="/instillinger">
                    <div className={`${location.includes("/instillinger") ? style.active : null}`}>
                        <Settings />
                        <Element>Instillinger</Element>
                    </div>
                </Link>
            </div>
            <div className={style.session}>
                <Element>Logg ut</Element>
                <Logout />
            </div>
        </div>
    );
};
