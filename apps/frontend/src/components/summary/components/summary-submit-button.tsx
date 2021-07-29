import { Innholdstittel } from "nav-frontend-typografi";
import React, { FC } from "react";
import style from "../summary.module.less";

export const SummarySubmitButton: FC = () => {
    return (
        <div className={style.summarySubmitButton}>
            <Innholdstittel>Lagre</Innholdstittel>
        </div>
    );
};
