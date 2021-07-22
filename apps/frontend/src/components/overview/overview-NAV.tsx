import { WarningFilled } from "@navikt/ds-icons";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "./overview-NAV.module.less"

export const OverviewNAV: FC = () => {
    return <div className={style.wrapper}>
        <WarningFilled className={style.warningIcon} />
        <div className={style.NAVevent}>
            <Undertekst>Mottatt 17.06.2021</Undertekst>
            <Undertekst>Bestilt utfyllende sykmelding</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>L02 Rygg symptomer/plager</Undertekst>
        </div>
        <WarningFilled className={style.warningIcon} />
        <div className={style.NAVevent}>
            <Undertekst>Mottatt 17.06.2021</Undertekst>
            <Undertekst>Bestilt utfyllende sykmelding</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>L02 Rygg symptomer/plager</Undertekst>
        </div>
        <WarningFilled className={style.warningIcon} />
        <div className={style.NAVevent}>
            <Undertekst>Mottatt 17.06.2021</Undertekst>
            <Undertekst>Bestilt utfyllende sykmelding</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>L02 Rygg symptomer/plager</Undertekst>
        </div>

    </div>
}