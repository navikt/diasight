import { ICondition } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Bandage } from "@navikt/ds-icons/cjs";
import { Undertittel } from "nav-frontend-typografi";
import Lenke from 'nav-frontend-lenker';
import React, { FC } from "react";
import style from "./patient.module.less";

interface IProps {
    conditions: ICondition[];
}

export const ChronicCondition: FC<IProps> = ({ conditions }) => {

    return (
        <div className={style.listWrapper}>
            <div className={style.iconWrapper}>
                <Bandage />
            </div>
            <div className={style.content}>
                <Undertittel>Kronisk ({conditions.length})</Undertittel>
                {conditions.map((c, index) => {
                    return <Lenke href="#" key={index}>{c.code?.text}</Lenke>
                })}
            </div>
        </div>
    );

}