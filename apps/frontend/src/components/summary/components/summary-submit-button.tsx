import { Innholdstittel } from "nav-frontend-typografi";
import React, { FC, useContext } from "react";
import style from "../summary.module.less";
import { SummaryContext } from "../../../layouts/contexts/summary-context";
import { summaryToTransactionBundle } from "../utils/update-composition";

export const SummarySubmitButton: FC = () => {
    const { changes } = useContext(SummaryContext);

    return (
        <div
            className={style.summarySubmitButton}
            onClick={() => summaryToTransactionBundle(changes)}>
            <Innholdstittel>Lagre</Innholdstittel>
        </div>
    );
};
