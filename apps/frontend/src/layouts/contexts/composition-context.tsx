import {
    IComposition,
    ICondition,
    IReference,
    IComposition_Section,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { createContext, FC, useState } from "react";

type CompositionContextState = {
    composition: IComposition;
    toggleCondition: (condition: IReference) => void;
    toggleEntry: (entry: IReference, condition: IReference) => void;
};

const contextDefaultValues: CompositionContextState = {
    composition: {
        resourceType: "Composition",
        author: [{ reference: "Practitioner/2" }],
        type: {
            text: "Medical record",
            coding: [
                {
                    system: "http://loinc.org",
                    code: "11503-0",
                },
            ],
        },
    },
    toggleCondition: () => null,
    toggleEntry: () => null,
};

export const CompositionContext = createContext<CompositionContextState>(contextDefaultValues);

const CompositionProvider: FC = ({ children }) => {
    const [composition, setComposition] = useState<IComposition>(contextDefaultValues.composition);

    const toggleCondition = (condition: IReference) => {
        const selectedSection = composition.section?.find((s) => s.focus === condition);
        const filteredSections = composition.section?.filter((s) => s.focus !== condition);

        // Remove condition
        if (selectedSection && filteredSections) {
            selectedSection.section = filteredSections;
            setComposition({ ...composition, section: filteredSections });
            return;
        }

        // Add condition if it does not exist and section is not empty
        if (filteredSections) {
            setComposition({
                ...composition,
                section: [...filteredSections, { focus: condition }],
            });
            return;
        }

        // Add condition of section is empty
        setComposition({ ...composition, section: [{ focus: condition }] });
    };

    const toggleEntry = (entry: IReference, main: IReference) => {
        const selectedSection = composition.section?.find((s) => s.focus === main);
        const filteredSections = composition.section?.filter((s) => s.focus !== main);

        // Is bi condition provided?
        if (selectedSection && filteredSections) {
            const selectedEntry = selectedSection.entry?.find((e) => e === entry);
            const filteredEntries = selectedSection.entry?.filter((e) => e !== entry);

            // Remove entry if exists
            if (selectedEntry && filteredEntries) {
                selectedSection.entry = filteredEntries;

                setComposition({
                    ...composition,
                    section: [...filteredSections, selectedSection],
                });

                return;
            }

            // Add entry at end if others exist
            if (filteredEntries) {
                setComposition({
                    ...composition,
                    section: [
                        ...filteredSections,
                        { ...selectedSection, entry: [...filteredEntries, entry] },
                    ],
                });

                return;
            }

            // Add entry if no others exist
            setComposition({
                ...composition,
                section: [...filteredSections, { ...selectedSection, entry: [entry] }],
            });
        }
    };

    return (
        <CompositionContext.Provider value={{ composition, toggleCondition, toggleEntry }}>
            {children}
        </CompositionContext.Provider>
    );
};

export default CompositionProvider;
