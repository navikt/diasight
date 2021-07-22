import { Sidetittel, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react"
import { usePatientResults } from "./hooks/use-patient-results";
import style from "./patient-search.module.less";
import { IBundle_Entry, IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Link } from "wouter";

interface IProps {
    identifier: string;
}

export const PatientResults: FC<IProps> = ({ identifier }) => {
    const { patientResults, isLoading, isError } = usePatientResults(identifier);

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    console.log(patientResults)

    if (patientResults) {
        return <div>
            {patientResults.map((patient: IPatient, index: number) => {
                return (
                    <Link href={"/pasient/" + patient?.id}>
                        <div className={style.patientWrapper} key={index}>

                            <Undertittel className={style.patientName}>
                                {(patient?.name ?? [])[0]?.given ?? ''} {(patient?.name ?? [])[0]?.family ?? ''}
                            </Undertittel>
                            <Undertittel className={style.patientBirthdate}>
                                {(patient?.identifier ?? [])[0]?.value ?? ''}
                            </Undertittel>

                        </div>
                    </Link>
                )
            })}
        </div >
    }
    return <Undertittel>Ingen resultater</Undertittel>
}