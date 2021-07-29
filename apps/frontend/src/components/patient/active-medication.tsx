import { IMedication } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Undertittel, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import React, { FC } from "react";
import style from "./patient.module.less";

interface IProps {
    medications?: IMedication[];
}

const meds: IMedication[] = [
    {
        resourceType: "Medication",
        code: { text: "Antepsin" },
    },
];

export const ActiveMedication: FC<IProps> = ({ medications = meds }) => {
    return (
        <div className={style.listWrapper}>
            {/* Medkit icon on left side
                <div className={style.iconWrapper}>
                    <HealthCase />
                </div>
            */}
            <div className={style.content}>
                <Undertittel>Aktive medikamenter ({medications.length})</Undertittel>
                {medications.map((c, index) => {
                    return (
                        <Lenke href="#" key={index}>
                            <Normaltekst>{c.code?.text}</Normaltekst>
                        </Lenke>
                    );
                })}
            </div>
        </div>
    );
};
