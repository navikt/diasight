import { CompositionContext } from "../../../layouts/contexts/composition-context";
import React, { FC, useContext } from "react";
import { Normaltekst } from "nav-frontend-typografi";

interface ISimplifiedComposition {
    main: {
        display: string;
        entries: string[];
        bis: ISimplifiedBiCondition[];
    };
}

interface ISimplifiedBiCondition {
    display: string;
    entries: string[];
}

export const Entry: FC = () => {
    const { composition } = useContext(CompositionContext);

    if (composition.section && composition.section.length > 0) {
        return (
            <div>
                {composition.section.map((main) => {
                    return <Normaltekst>{main.focus?.display}</Normaltekst>;
                })}
            </div>
        );
    }

    return null;
};
