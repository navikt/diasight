import { WarningFilled } from "@navikt/ds-icons";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "./overviewHospital.module.less"

export const OverviewHospital: FC = () => {
    return <div className={style.wrapper}>
        <WarningFilled className={style.warningIcon} />
        <div className={style.hospitalEvent}>
            <Undertekst>Epikrise</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>Medisinsk avdeling, Sykehus</Undertekst>
        </div>
        <WarningFilled className={style.warningIcon} />
        <div className={style.hospitalEvent}>
            <Undertekst>Epikrise</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>Medisinsk avdeling, Sykehus</Undertekst>
        </div>
        <WarningFilled className={style.warningIcon} />
        <div className={style.hospitalEvent}>
            <Undertekst>Epikrise</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>Medisinsk avdeling, Sykehus</Undertekst>
        </div>

    </div>
}