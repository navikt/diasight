import { Ingress, Normaltekst } from "nav-frontend-typografi";
import React from "react";
import { FC } from "react";
import { Link } from "wouter";
import style from "./navbar.module.less";

export const Navbar: FC = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.identifier}>
                <Normaltekst>DR. NYSTØL</Normaltekst>
                <Normaltekst>OVERLEGE</Normaltekst>
                <Normaltekst>OSLO KLINIKK</Normaltekst>
            </div>
            <div className={style.options}>
                <Link href="/"><Ingress>Oversikt</Ingress></Link>
                <Link href="/pasient"><Ingress>Pasient</Ingress></Link>
                <Link href="/timeplan"><Ingress>Timeplan</Ingress></Link>
                <Link href="/inbox"><Ingress>Inbox</Ingress></Link>
                <Link href="/instillinger"><Ingress>Instillinger</Ingress></Link>
            </div>
            <div className={style.session}>
                <Normaltekst>Logg ut</Normaltekst>
                <div>ICON</div>
            </div>
        </div>);
};
