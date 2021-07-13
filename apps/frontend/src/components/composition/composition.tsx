import React, { useState, FC } from "react";
import { usePatientComposition } from "./hooks/use-patient-composition";
import { BiCondition } from "./bi-condition";
import { MainCondition } from "./main-condition";
import { idToNumber } from "./utils/idToNumber";

interface IProps {
    patientID: number;
}

/*
 * One composition consists of a condition (primary section of the composition) and several other resources (nested sections of the condition) such as appointments,
 * adverse-events, and procedures.
 */

// TODO: Create bundle component. Figure out what data is shared between resources for better readability.

export const Composition: FC<IProps> = ({ patientID }) => {
    const [active, setActive] = useState(false);
    const { composition, isLoading, isError } = usePatientComposition(patientID);

    console.log(composition);

    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>

    if (composition) {
        composition.section?.map((condition, index) => {
            if (!condition.focus?.reference || !condition.section?.length) return null;
            return (
                <div>
                    <MainCondition key={index} conditionID={idToNumber(condition.focus.reference)} />
                    {condition.section.map((value, index) => {
                        if (!value.focus?.reference) return null;
                        return (<BiCondition key={index} conditionID={idToNumber(value.focus.reference)} />);
                    })}
                </div>
            );
        });
    }

    /*
    if (composition) {
        return (
            <div className={style.wrapper}>
                <div className={style.conditionHeader}>
                    <h2>{ }</h2>
                    <h2>{ }</h2>
                    <div
                        className={style.dropdown}
                        onClick={() => setActive(!active)}>
                        DROP
                    </div>
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
    */
};
