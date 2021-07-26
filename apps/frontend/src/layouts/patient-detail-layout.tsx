import { Knapp } from "nav-frontend-knapper";
import React, { FC } from "react";
import CompositionList from "../components/composition";
import Patient from "../components/patient";
import { Questionnaire } from "../components/questionnaire/questionnaire";
import CompositionProvider from "./contexts/composition-context";
import style from "./patient-detail-layout.module.less";

interface IProps {
    id: number;
}

export const PatientDetailLayout: FC<IProps> = ({ id }) => {
    return (
        <CompositionProvider>
            <div className={style.patientDetailWrapper}>
                <div className={style.column}>
                    <Patient id={id} />
                    <Questionnaire id={11} />
                </div>
                <div className={style.column}>
                    <div className={style.buttons}>
                        <Knapp>Resept</Knapp>
                        <Knapp>Henvisning</Knapp>
                        <Knapp>Sykmelding</Knapp>
                        <Knapp>Legeerklæring</Knapp>
                    </div>

                    <div className={style.composition}>
                        <CompositionList patientRef={id} />
                    </div>
                </div>
            </div>
        </CompositionProvider>
    );
};
