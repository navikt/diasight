import React, { useState } from 'react';
import { FC } from "react";
import style from "./composition.module.less";
import { Expand } from "@navikt/ds-icons";
import { ICondition } from '@ahryman40k/ts-fhir-types/lib/R4';

interface IProps {
    condition: ICondition
}

export const Condition: FC<IProps> = ({ condition }) => {

    const [active, setActive] = useState(false);

    const date = "24-04-2021";


    return (
        <div className={style.wrapper}>
            <div className={style.conditionHeader}>
                <h2>AA00</h2>
                <h2>Kronisk obstruktiv lungesykdom</h2>
                <div className={style.dropdown} onClick={() => setActive(!active)}><Expand aria-label="Expand" role="img" focusable="false" /></div>
            </div>
            <table className={`${style.tableWrapper} ${active ? style.visible : ""} `}>
                <tr>
                    <th>Dato</th>
                    <td></td>
                    <th>Hendelsesforløp</th>
                    <th>Type</th>
                    <th>Avdeling</th>
                </tr>
                <tr>
                    <td>{date}</td>
                    <td>
                        <div className={style.timestamp}></div>
                    </td>
                    <td>Tilstand på tidspunkt</td>
                    <td>Notat</td>
                    <td>Sykehuset Innlandet</td>
                </tr>
                <tr>
                    <td>{date}</td>
                    <td>
                        <div className={style.timestamp}></div>
                    </td>
                    <td>Tilstand på tidspunkt</td>
                    <td>Notat</td>
                    <td>Sykehuset Innlandet</td>
                </tr>
                <tr>
                    <td>{date}</td>
                    <td>
                        <div className={style.timestamp}></div>
                    </td>
                    <td>Tilstand på tidspunkt</td>
                    <td>Notat</td>
                    <td>Sykehuset Innlandet</td>
                </tr>
            </table>
        </div>
    )
}