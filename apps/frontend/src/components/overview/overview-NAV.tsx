import { Undertekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "./overview-NAV.module.less"
import { useNAVtask } from "./hooks/use-NAV-task"
import { ITask } from "@ahryman40k/ts-fhir-types/lib/R4";
import { dateReverser } from "./utils/date-formatter";
import { WarningFilled } from "@navikt/ds-icons/cjs";

interface IProps {
    id: number;
}

export const OverviewNAV: FC = () => {
    const practitionerId = "1553";
    const NAVid = "1559";
    const { NAVtasks, isLoading, isError } = useNAVtask(practitionerId, NAVid);

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    //console.log(NAVtasks);

    if (NAVtasks) {
        return <div className={style.wrapper}>
            {NAVtasks.map((task: ITask, index: number) => {

                console.log(task)

                return (
                    <>
                        <WarningFilled className={style.warningIcon} />
                        <div className={style.NAVevent} key={index}>
                            <Undertekst>Mottat {dateReverser(task.authoredOn ? task.authoredOn.substr(0, 10) : "")}</Undertekst>
                            <Undertekst>{task.code ? task.code.text : "Ingen info"}</Undertekst>
                            <Undertittel>Sofie Fagermo</Undertittel>
                            <Undertekst>L02 Ryggsymptomer</Undertekst>
                        </div>
                    </>
                    /* return <div className={style.wrapper}>
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
            </div>*/
                )
            })}
        </div>
    }
    return <Undertittel>Ingen oppgaver</Undertittel>
}