import React, { FC } from "react"
import { usePatientResults } from "./hooks/use-patient-results";

interface IProps {
    birthdate: string;
}

export const PatientResults: FC<IProps> = ({ birthdate }) => {
    const { patientResults, isLoading, isError } = usePatientResults(birthdate);

    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h1>Error</h1>

    console.log(patientResults.entry[0].resource.name[0].given[0]);

    return <div>
        <table>
            {patientResults.map((entry: any) => {
                return <td key={patientResults.indexOf(entry)}>
                    {JSON.stringify(entry.name)}
                </td>
            })}
        </table>
    </div>
}