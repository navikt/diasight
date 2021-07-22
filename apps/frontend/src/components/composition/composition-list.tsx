import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { FC } from "react";
import { Composition } from "./components/composition";
import { usePatientComposition } from "./hooks/use-patient-composition";

interface IProps {
    patientRef: number;
}

export const CompositionList: FC<IProps> = ({ patientRef }) => {
    const { compositions, isLoading, isError } = usePatientComposition(patientRef);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    return (
        <div>
            {compositions?.map((c, i) => {
                return <Composition key={i} composition={c} />;
            })}
        </div>
    );
};
