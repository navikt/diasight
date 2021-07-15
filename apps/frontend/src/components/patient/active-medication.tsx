import { IMedication } from "@ahryman40k/ts-fhir-types/lib/R4";
import { HealthCase } from "@navikt/ds-icons/cjs";
import { Undertittel } from "nav-frontend-typografi";
import Lenke from 'nav-frontend-lenker';
import React, { FC } from "react";
import style from "./patient.module.less";

interface IProps {
    medications: IMedication[];
}

export const ActiveMedication: FC<IProps> = ({ medications }) => {

    return (
        <div className={style.listWrapper}>
            <div className={style.iconWrapper}>
                <HealthCase />
            </div>
            <div className={style.content}>
                <Undertittel>Aktive medikamenter ({medications.length})</Undertittel>
                {medications.map((c, index) => {
                    return <Lenke href="#" key={index}>{c.code?.text}</Lenke>
                })}
            </div>
        </div>
    );

}