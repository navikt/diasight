import { Cancel } from "@navikt/ds-icons/cjs";
import React, { FC, useState } from "react";
import CompositionList from "../components/composition";
import { Observation } from "../components/observation/observation";
import { ActiveMedication, Patient, PatientContact } from "../components/patient";
import { Questionnaire } from "../components/questionnaire/questionnaire";
import { Summary, SummaryButton } from "../components/summary";
import SelectionProvider from "./contexts/selection-context";
import SummaryProvider from "./contexts/summary-context";
import { usePatient } from "./hooks";
import style from "./patient-detail-layout.module.less";
import { useParams } from "react-router";

interface IPatientRouteParams {
    id: string;
}

export const PatientDetailLayout: FC<any> = () => {
    const { id } = useParams<IPatientRouteParams>();
    const [showSummary, setShowSummary] = useState(false);
    const { patient, isLoading, isError } = usePatient(id);

    if (isLoading) return <div>Loading</div>;
    if (isError) return <div>Error</div>;

    if (patient) {
        return (
            <SelectionProvider>
                <SummaryProvider>
                    {showSummary ? (
                        <div className={style.patientSummaryWrapper}>
                            <div className={style.patientSummaryInfo}>
                                <Patient patient={patient} />
                            </div>
                            <Cancel
                                onClick={() => setShowSummary(false)}
                                className={style.returnButton}
                            />
                            <div className={style.patientSummaryContent}>
                                <Summary />
                            </div>
                        </div>
                    ) : (
                        <div className={style.patientDetailWrapper}>
                            <div className={style.column}>
                                <Patient patient={patient} />
                                <div className={style.row}>
                                    <ActiveMedication />
                                    {patient.telecom && patient.address &&
                                    <PatientContact
                                        address={patient.address}
                                        telecom={patient.telecom}
                                    />
                                    }
                                </div>
                                <Questionnaire id={10} patient={patient} />
                                <Observation />
                            </div>
                            <div className={style.column}>
                                <div className={style.buttons}>
                                    <SummaryButton showSummary={() => setShowSummary(true)} />
                                </div>

                                <div className={style.composition}>
                                    <CompositionList patientId={id} />
                                </div>
                            </div>
                        </div>
                    )
                    }
                </SummaryProvider>
            </SelectionProvider>
        );
    }

    return <div>Pasienten finnes ikke</div>;
};
