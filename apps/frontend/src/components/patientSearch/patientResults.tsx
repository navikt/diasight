import { Sidetittel, Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react"
import { usePatientResults } from "./hooks/use-patient-results";
import style from "./patientSearch.module.less";
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

    return <div>
        {patientResults
            ? patientResults.entry?.map((entryItem: IBundle_Entry, index: number) => {
                if (entryItem.resource) {
                    const currentPatient = entryItem.resource as IPatient

                    return (
                        <Link href={"/pasient/" + currentPatient?.id}>
                            <div className={style.patientWrapper} key={index}>

                                <Undertittel className={style.patientName}>
                                    {(currentPatient?.name ?? [])[0]?.given ?? ''} {(currentPatient?.name ?? [])[0]?.family ?? ''}
                                </Undertittel>
                                <Undertittel className={style.patientBirthdate}>
                                    {(currentPatient?.identifier ?? [])[0]?.value ?? ''}
                                </Undertittel>

                            </div>
                        </Link>
                    )
                } else {
                    return null
                }
            })
            : <Sidetittel className={style.noResults}>Ingen resultater</Sidetittel>}
    </div >
}