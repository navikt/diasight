import React, { FC, useContext } from "react";
import { Normaltekst, Undertekst, UndertekstBold } from "nav-frontend-typografi";
import { SelectionContext } from "../../../layouts/contexts/selection-context";

export const Entry: FC = () => {
    const { selections } = useContext(SelectionContext);

    if (selections) {
        return (
            <div>
                <UndertekstBold>Se vedlagt</UndertekstBold>
                {selections.map((s, i) => {
                    return (
                        <div key={i}>
                            <Normaltekst key={i}>{s.condition.code?.text}</Normaltekst>
                            {s.resources.map((e, j) => {
                                return <Undertekst key={j}>{e.id || "hei"}</Undertekst>;
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    return null;
};
