import { Clock, CoApplicant, Email, Logout, Settings, System } from "@navikt/ds-icons/cjs";
import { Element, Undertekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import DocProfilePicture from "../../assets/doc.png";
import style from "./navbar.module.less";
import DiaSightLogo from "../../assets/logo.svg";
import { NavbarItem } from "./navbar-item";
import { IPractitioner } from "@ahryman40k/ts-fhir-types/lib/R4";

interface Props {
    user: IPractitioner,
    logoutUrl: string,
}

export const Navbar: FC<Props> = ({ user, logoutUrl }) => {
    let profilePic: string = DocProfilePicture;
    user.photo?.forEach(photo => {
        if (photo.url) profilePic = photo.url;
    });
    let userName = undefined;
    user.name?.forEach(name => {
        userName = name.prefix + " " + name.family;
    });

    return (
        <div className={style.wrapper}>
            <img src={DiaSightLogo} alt="" />
            <div className={style.identifier}>
                <img src={profilePic} alt="" className={style.avatar} />
                <Undertittel>{userName}</Undertittel>
                <Undertekst>Overlege</Undertekst>
                <Undertekst>Oslo legekontor</Undertekst>
            </div>
            <div className={style.options}>
                <NavbarItem path={"/oversikt"} name={"Oversikt"} icon={<System />} />
                <NavbarItem path={"/pasient"} name={"Pasient"} icon={<CoApplicant />} />
                <NavbarItem path={"/timeplan"} name={"Timeplan"} icon={<Clock />} />
                <NavbarItem path={"/inbox"} name={"Inbox"} icon={<Email />} />
                <NavbarItem path={"/instillinger"} name={"Instillinger"} icon={<Settings />} />
            </div>

            <a href={logoutUrl} className={style.session}>
                <Element>Logg ut</Element>
                <Logout />
            </a>

        </div>
    );
};
