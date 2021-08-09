/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useEffect } from "react";
import { Element, Normaltekst, Undertekst, UndertekstBold } from "nav-frontend-typografi";
import { SelectionContext } from "../../../layouts/contexts/selection-context";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { IQuestionnaireResponse_Answer, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { selectionsToReferences } from "../utils/selections-to-references";

interface IProps {
    onChange: (answer: IQuestionnaireResponse_Answer[]) => void;
    values: IQuestionnaireResponse_Answer[];
    required?: boolean;
}

export const Entry: FC<IProps> = ({ onChange, values, required = false }) => {
    const { selections } = useContext(SelectionContext);

    useEffect(() => {
        const references: IReference[] = selectionsToReferences(selections);
        const answers: IQuestionnaireResponse_Answer[] = [];

        references.map((ref) => {
            answers.push({ valueReference: ref });
        });

        onChange(answers);
    }, [selections]);

    if (selections) {
        return (
            <div>
                <Element>{`Vedlegg${required ? "*" : ""}:`}</Element>
                {selections.length > 0 ? (
                    <>
                        {selections.map((s, i) => {
                            return (
                                <div key={i}>
                                    <Normaltekst key={i}>{s.condition.code?.text}</Normaltekst>
                                    {s.resources.map((e, j) => {
                                        return (
                                            <Undertekst key={j}>
                                                {e.resourceType || "Sykemelding"}
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
