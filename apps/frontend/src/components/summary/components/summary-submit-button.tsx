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
        const result = await axios
            .post("/api/", bundle)
            .then((r) => {
                setSubmitState(SubmitState.success);
                return r;
            })
            .catch((error) => {
                setSubmitState(SubmitState.error);
                return error;
            });
    };

    return (
        <div className={style.summarySubmitButton} onClick={() => handleSubmit()}>
            {submitState === SubmitState.ready ? <Innholdstittel>Lagre</Innholdstittel> : null}
            {submitState === SubmitState.loading ? <NavFrontendSpinner /> : null}
            {submitState === SubmitState.error ? <Error /> : null}
            {submitState === SubmitState.success ? <SuccessStroke /> : null}
        </div>
    );
};
