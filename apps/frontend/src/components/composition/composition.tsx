import React, { useState } from "react";
import { FC } from "react";

import style from "./composition.module.less";
import { IComposition } from "@ahryman40k/ts-fhir-types/lib/R4";

interface IProps {
    composition: IComposition;
}

/*
 * One composition consists of a condition (primary section of the composition) and several other resources (nested sections of the condition) such as appointments,
 * adverse-events, and procedures.
 */

// TODO: Create bundle component. Figure out what data is shared between resources for better readability.

export const Composition: FC<IProps> = ({ composition }) => {
    const [active, setActive] = useState(false);


    const primaryCondition = composition.section
        ? composition.section[0]
        : null;


    if (composition) {
        return (
            <div className={style.wrapper}>
                <div className={style.conditionHeader}>
                    <h2>{primaryCondition?.code}</h2>
                    <h2>{primaryCondition?.title}</h2>
                    <div
                        className={style.dropdown}
                        onClick={() => setActive(!active)}>
                        DROP
                    </div>
                </div>
                <table
                    className={`${style.tableWrapper} ${active ? style.visible : ""
                        } `}>
                    <tr>
                        <th>Dato</th>
                        <td></td>
                        <th>Hendelsesforløp</th>
                        <th>Type</th>
                        <th>Avdeling</th>
                    </tr>
                    <tr>
                        <td>{composition.date}</td>
                        <td>
                            <div className={style.timestamp}></div>
                        </td>
                        <td>Tilstand på tidspunkt</td>
                        <td>Notat</td>
                        <td>Sykehuset Innlandet</td>
                    </tr>
                    <tr>
                        <td>{composition.date}</td>
                        <td>
                            <div className={style.timestamp}></div>
                        </td>
                        <td>Tilstand på tidspunkt</td>
                        <td>Notat</td>
                        <td>Sykehuset Innlandet</td>
                    </tr>
                    <tr>
                        <td>{composition.date}</td>
                        <td>
                            <div className={style.timestamp}></div>
                        </td>
                        <td>Tilstand på tidspunkt</td>
                        <td>Notat</td>
                        <td>Sykehuset Innlandet</td>
                    </tr>
                </table>
            </div>
        );
    }

    return <h1>Failed to load resource</h1>;
};
