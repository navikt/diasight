import React, { FC } from "react";
import { Composition } from "./components/composition";
import { usePatientComposition } from "./hooks/use-patient-composition";
import style from "./composition.module.less";
import { Undertittel } from "nav-frontend-typografi";

interface IProps {
    patientRef: number;
}

export const CompositionList: FC<IProps> = ({ patientRef }) => {
    const { compositions, isLoading, isError } = usePatientComposition(patientRef);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    return (
        <div className={style.compositionWrapper}>
            <Undertittel>Diagnostikk</Undertittel>
            {compositions?.map((c, i) => {
                return <Composition key={i} composition={c} />;
            })}
        </div>
    );
};
