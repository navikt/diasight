import { Innholdstittel } from "nav-frontend-typografi";
import React, { FC, useContext, useState } from "react";
import style from "../summary.module.less";
import { SummaryContext } from "../../../layouts/contexts/summary-context";
import { summaryToTransactionBundle } from "../utils/update-composition";
import axios from "axios";
import NavFrontendSpinner from "nav-frontend-spinner";
import { SuccessStroke, Error } from "@navikt/ds-icons/cjs";

enum SubmitState {
    ready = "READY",
    loading = "LOADING",
    error = "ERROR",
    success = "SUCCESS",
}

export const SummarySubmitButton: FC = () => {
    const { changes } = useContext(SummaryContext);
    const [submitState, setSubmitState] = useState<string>(SubmitState.ready);

    const handleSubmit = async () => {
        setSubmitState(SubmitState.loading);

        const bundle = summaryToTransactionBundle(changes);

        console.log(bundle);

        const result = await axios
            .post("/api/", bundle)
            .then((r) => {
                setSubmitState(SubmitState.success);
                return r;
            })
            .catch((error) => {
                setSubmitState(SubmitState.error);
                console.log(error);
                return error;
            });
    };

    switch (submitState) {
        case SubmitState.loading:
            return (
                <div className={`${style.summarySubmitButton} ${style.loading}`}>
                    <NavFrontendSpinner />
                </div>
            );
        case SubmitState.error:
            return (
                <div className={`${style.summarySubmitButton} ${style.error}`}>
                    <Error />
                </div>
            );
        case SubmitState.success:
            return (
                <div className={`${style.summarySubmitButton} ${style.success}`}>
                    <SuccessStroke />
                </div>
            );
        default:
            return (
                <div className={style.summarySubmitButton} onClick={() => handleSubmit()}>
                    <Innholdstittel>Lagre</Innholdstittel>
                </div>
            );
    }
};
