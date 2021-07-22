import { CompositionContext } from "../../../layouts/contexts/composition-context";
import React, { FC, useContext } from "react";
import { Normaltekst, Undertekst, UndertekstBold } from "nav-frontend-typografi";

export const Entry: FC = () => {
    const { composition } = useContext(CompositionContext);

    if (composition.section && composition.section.length > 0) {
        return (
            <div>
                <UndertekstBold>Se vedlagt</UndertekstBold>
                {composition.section.map((c, i) => {
                    return (
                        <div key={i}>
                            <Normaltekst key={i}>{c.focus?.display}</Normaltekst>
                            {c.entry?.map((e, j) => {
                                return <Undertekst key={j}>{e.display || "hei"}</Undertekst>;
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }

    return null;
};
