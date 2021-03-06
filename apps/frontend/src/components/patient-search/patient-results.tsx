import { Undertittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import { usePatientResults } from "./hooks/use-patient-results";
import style from "./patient-search.module.less";
import { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { Link } from "react-router-dom";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";

interface IProps {
    searchValue: string;
}

export const PatientResults: FC<IProps> = ({ searchValue }) => {
    const { patientResults, isLoading, isError } = usePatientResults(searchValue);

    if (isLoading) return <NavFrontendSpinner />;
    if (isError) return <AlertStripeFeil>Ingen resultater. Prøv å søke enten på fornavn eller etternavn, eller enten fødselsnummer eller personnummer.</AlertStripeFeil>;

    if (patientResults) {
        return <>
            {patientResults.map((patient: IPatient, index: number) => {
                return (
                    <Link to={"/pasient/" + patient?.id} key={"patient-results-table-row-" + index}>
                        {/* The format of names etc in FHIR is somewhat cumbersome to use */}
                        {/* The conversion from IBundle and IBundleEntry to IPatient */}
                        {/* and the presence of undefined further complicates things */}
                        {/* The nullish coalescing operator can be useful in these cases */}
                        <div className={style.patientWrapper}>
                            <Undertittel className={style.patientName}>
                                {(patient?.name ?? [])[0]?.given ?? ""} {(patient?.name ?? [])[0]?.family ?? ""}
                            </Undertittel>
                            <Undertittel className={style.patientBirthdate}>
                                {(patient?.identifier ?? [])[0]?.value ?? ""}
                            </Undertittel>
                        </div>
                    </Link>
                );
            })}
        </>;
    }
    return <AlertStripeFeil>Ingen resultater. Prøv å søke enten på fornavn eller etternavn, eller enten fødselsnummer eller personnummer.</AlertStripeFeil>;
};
