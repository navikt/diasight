import { ICondition } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Bandage } from "@navikt/ds-icons/cjs";
import { Undertittel, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import React, { FC } from "react";
import style from "./patient.module.less";

interface IProps {
    conditions: ICondition[];
}

const cons: ICondition[] = [
    {
        resourceType: "Condition",
        subject: { reference: "Patient/1" },
        code: { text: "Magesyre" },
    },
];

export const ChronicCondition: FC<IProps> = ({ conditions = cons }) => {
    return (
        <div className={style.listWrapper}>
            <div className={style.iconWrapper}>
                <Bandage />
            </div>
            <div className={style.content}>
                <Undertittel>Kronisk ({conditions.length})</Undertittel>
                {conditions.map((c, index) => {
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
