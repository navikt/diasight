import { ITask } from "@ahryman40k/ts-fhir-types/lib/R4";
import { WarningFilled } from "@navikt/ds-icons/cjs";
import { Undertekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import { useHospitalTasks } from "./hooks/use-hospital-task";
import style from "./overview-hospital.module.less";

interface IProps {
    id: number,
}


export const OverviewHospital: FC = () => {
    const practitionerId = "1553";
    const { hospitalTasks, isLoading, isError } = useHospitalTasks(practitionerId)

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    console.log(hospitalTasks)

    if (hospitalTasks) {
        return <div className={style.wrapper}>
            {hospitalTasks.map((task: ITask, index: number) => {
                //console.log(task)

                return (
                    <>
                        <WarningFilled className={style.warningIcon} />
                        <div className={style.hospitalEvent} key={index}>
                            <Undertekst>{task.code ? task.code.text : "Ingen info"}</Undertekst>
                            <Undertittel>Sofie Fagermo</Undertittel>
                            <Undertekst>Dr. Ola Nordmann, Ullevål</Undertekst>
                        </div>
                    </>
                )
            })}
        </div>
    }

    return <Undertittel>Ingen oppgaver</Undertittel>

    /* return <div className={style.wrapper}>
        <WarningFilled className={style.warningIcon} />
        <div className={style.hospitalEvent}>
            <Undertekst>Epikrise</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>Dr. Ola Nordmann, Ullevål</Undertekst>
        </div>
        <WarningFilled className={style.warningIcon} />
        <div className={style.hospitalEvent}>
            <Undertekst>Epikrise</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>Dr. Ola Nordmann, Ullevål</Undertekst>
        </div>
        <WarningFilled className={style.warningIcon} />
        <div className={style.hospitalEvent}>
            <Undertekst>Epikrise</Undertekst>
            <Undertittel>Sofie Fagermo</Undertittel>
            <Undertekst>Dr. Ola Nordmann, Ullevål</Undertekst>
        </div>
    </div> */
}