import {
    IComposition,
    ICondition,
    IReference,
    IComposition_Section,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { createContext, FC, useState } from "react";

type CompositionContextState = {
    composition: IComposition;
    toggleMainCondition: (main: IReference) => void;
    toggleBiCondition: (bi: IReference, main: IReference) => void;
    toggleEntry: (entry: IReference, main: IReference, bi: IReference | null) => void;
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
    toggleMainCondition: () => null,
    toggleBiCondition: () => null,
    toggleEntry: () => null,
};

export const CompositionContext = createContext<CompositionContextState>(contextDefaultValues);

const CompositionProvider: FC = ({ children }) => {
    const [composition, setComposition] = useState<IComposition>(contextDefaultValues.composition);

    const toggleMainCondition = (main: IReference) => {
        const selectedMainSection = composition.section?.find((s) => s.focus === main);
        const filteredMainSections = composition.section?.filter((s) => s.focus !== main);

        // Remove main condition
        if (selectedMainSection && filteredMainSections) {
            selectedMainSection.section = filteredMainSections;
            setComposition({ ...composition, section: filteredMainSections });
            return;
        }

        // Add main condition if it does not exist and section is not empty
        if (filteredMainSections) {
            setComposition({
                ...composition,
                section: [...filteredMainSections, { focus: main }],
            });
            return;
        }

        // Add main condition of section is empty
        setComposition({ ...composition, section: [{ focus: main }] });
    };

    const toggleBiCondition = (bi: IReference, main: IReference) => {
        const selectedMainSection = composition.section?.find((s) => s.focus === main);
        const filteredMainSections = composition.section?.filter((s) => s.focus !== main);

        if (selectedMainSection && filteredMainSections) {
            const selectedBiSection = selectedMainSection.section?.find((s) => s.focus === bi);
            const filteredBiSections = selectedMainSection.section?.filter((s) => s.focus !== bi);

            // Remove bi condition from selected main condition
            if (selectedBiSection && filteredBiSections) {
                selectedMainSection.section = filteredBiSections;

                setComposition({
                    ...composition,
                    section: [
                        ...filteredMainSections,
                        { ...selectedMainSection, section: filteredBiSections },
                    ],
                });

                return;
            }

            // Add bi condition if it does not exist and section is not empty
            if (filteredBiSections) {
                setComposition({
                    ...composition,
                    section: [
                        ...filteredMainSections,
                        { ...selectedMainSection, section: [...filteredBiSections, { focus: bi }] },
                    ],
                });

                return;
            }

            // Add bi condition if section in empty
            setComposition({
                ...composition,
                section: [
                    ...filteredMainSections,
                    { ...selectedMainSection, section: [{ focus: bi }] },
                ],
            });
        }
    };

    const toggleEntry = (entry: IReference, main: IReference, bi: IReference | null = null) => {
        const selectedMainSection = composition.section?.find((s) => s.focus === main);
        const filteredMainSections = composition.section?.filter((s) => s.focus !== main);

        // Is bi condition provided?
        if (selectedMainSection && filteredMainSections && !bi) {
            const selectedEntry = selectedMainSection.entry?.find((e) => e === entry);
            const filteredEntries = selectedMainSection.entry?.filter((e) => e !== entry);

            // Remove entry if exists
            if (selectedEntry && filteredEntries) {
                selectedMainSection.entry = filteredEntries;

                setComposition({
                    ...composition,
                    section: [...filteredMainSections, selectedMainSection],
                });

                return;
            }

            // Add entry at end if others exist
            if (filteredEntries) {
                setComposition({
                    ...composition,
                    section: [
                        ...filteredMainSections,
                        { ...selectedMainSection, entry: [...filteredEntries, entry] },
                    ],
                });

                return;
            }

            // Add entry if no others exist
            setComposition({
                ...composition,
                section: [...filteredMainSections, { ...selectedMainSection, entry: [entry] }],
            });
        }

        if (selectedMainSection && filteredMainSections && bi) {
            const selectedBiSection = selectedMainSection.section?.find((s) => s.focus === bi);
            const filteredBiSections = selectedMainSection.section?.filter((s) => s.focus !== bi);

            if (selectedBiSection && filteredBiSections) {
                const selectedEntry = selectedBiSection.entry?.find((e) => e.reference === entry);
                const filteredEntries = selectedBiSection.entry?.filter(
                    (e) => e.reference !== entry
                );

                // Remove entry if exists
                if (selectedEntry && filteredEntries) {
                    selectedBiSection.entry = filteredEntries;

                    setComposition({
                        ...composition,
                        section: [
                            ...filteredMainSections,
                            {
                                ...selectedMainSection,
                                section: [...filteredBiSections, selectedBiSection],
                            },
                        ],
                    });

                    return;
                }

                if (filteredEntries) {
                    setComposition({
                        ...composition,
                        section: [
                            ...filteredMainSections,
                            {
                                ...selectedMainSection,
                                section: [
                                    ...filteredBiSections,
                                    { ...selectedBiSection, entry: [...filteredEntries, entry] },
                                ],
                            },
                        ],
                    });

                    return;
                }

                setComposition({
                    ...composition,
                    section: [
                        ...filteredMainSections,
                        {
                            ...selectedMainSection,
                            section: [
                                ...filteredBiSections,
                                { ...selectedBiSection, entry: [entry] },
                            ],
                        },
                    ],
                });
            }
        }
    };

    return (
        <CompositionContext.Provider
            value={{ composition, toggleMainCondition, toggleBiCondition, toggleEntry }}>
            {children}
        </CompositionContext.Provider>
    );
};

export default CompositionProvider;
