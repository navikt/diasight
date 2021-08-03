import React, { FC, useContext } from "react";
import { Element, Normaltekst, Undertekst, UndertekstBold } from "nav-frontend-typografi";
import { SelectionContext } from "../../../layouts/contexts/selection-context";
import { AlertStripeInfo } from "nav-frontend-alertstriper";

export const Entry: FC = () => {
    const { selections } = useContext(SelectionContext);

    if (selections) {
        return (
            <div>
                <Element>Vedlegg:</Element>
                {selections.length > 0 ? (
                    <>
                        {selections.map((s, i) => {
                            return (
                                <div key={i}>
                                    <Normaltekst key={i}>{s.condition.code?.text}</Normaltekst>
                                    {s.resources.map((e, j) => {
                                        return (
                                            <Undertekst key={j}>
                                                {e.resourceType || "hei"}
                                            </Undertekst>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <Undertekst>Ingen vedlegg er valgt.</Undertekst>
                )}
            </div>
        );
    }

    return null;
};
