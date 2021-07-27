import { Knapp } from "nav-frontend-knapper";
import React, { FC } from "react";
import CompositionList from "../components/composition";
import { Observation } from "../components/observation/observation";
import Patient from "../components/patient";
import { Questionnaire } from "../components/questionnaire/questionnaire";
import CompositionProvider from "./contexts/composition-context";
import SummaryProvider from "./contexts/summary-context";
import style from "./patient-detail-layout.module.less";

interface IProps {
    id: number;
}

export const PatientDetailLayout: FC<IProps> = ({ id }) => {
    return (
        <CompositionProvider>
            <SummaryProvider>
                <div className={style.patientDetailWrapper}>
                    <div className={style.column}>
                        <Patient id={id} />
                        <Observation />
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
            </SummaryProvider>
        </CompositionProvider>
    );
};
