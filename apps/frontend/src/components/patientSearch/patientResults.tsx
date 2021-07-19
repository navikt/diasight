import { Sidetittel, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react"
import { usePatientResults } from "./hooks/use-patient-results";
import style from "./patientSearch.module.less";

interface IProps {
    identifier: string;
}

export const PatientResults: FC<IProps> = ({ identifier }) => {
    const { patientResults, isLoading, isError } = usePatientResults(identifier);

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    console.log(patientResults);

    return <div>
        {patientResults.entry
            ? patientResults.entry.map((entryItem: any, index: number) => {
                return (<div className={style.patientWrapper} key={index}>
                    <Undertittel className={style.patientName}>
                        {entryItem.resource.name[0].given} {entryItem.resource.name[0].family}
                    </Undertittel>
                    <Undertittel className={style.patientBirthdate}>
                        {entryItem.resource.identifier[0].value}
                    </Undertittel>
                </div>)
            })
            : <Sidetittel className={style.noResults}>Ingen resultater</Sidetittel>}
    </div>
}