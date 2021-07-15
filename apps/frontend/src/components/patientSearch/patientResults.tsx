import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react"
import { usePatientResults } from "./hooks/use-patient-results";
import style from "./patientSearch.module.less";

interface IProps {
    birthdate: string;
}

export const PatientResults: FC<IProps> = ({ birthdate }) => {
    const { patientResults, isLoading, isError } = usePatientResults(birthdate);

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    console.log(patientResults.entry[0]);

    return <div>
        {patientResults.entry.map((entryItem: any, index: number) => {
            return (<div className={style.resultWrapper} key={index}>
                <Undertittel className={style.patientName}>
                    {entryItem.resource.name[0].given[0]} {entryItem.resource.name[0].family}
                </Undertittel>
                <Undertittel className={style.patientBirthdate}>
                    {entryItem.resource.birthDate}
                </Undertittel>
            </div>)
        })}
    </div>
}