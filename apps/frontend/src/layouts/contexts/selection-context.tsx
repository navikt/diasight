import { IComposition, IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { createContext, FC, useState } from "react";

type EntrySelection = {
    composition: IReference;
    condition: IReference;
    resources: IReference[];
};

type SelectionContextState = {
    selections: EntrySelection[];
    toggleCondition: (condition: IReference, composition: IReference) => void;
    toggleEntry: (entry: IReference, condition: IReference, composition: IReference) => void;
};

const contextDefaultValues: SelectionContextState = {
    selections: [],
    toggleCondition: () => null,
    toggleEntry: () => null,
};

export const SelectionContext = createContext<SelectionContextState>(contextDefaultValues);

const SelectionProvider: FC = ({ children }) => {
    const [selections, setSelections] = useState<EntrySelection[]>(contextDefaultValues.selections);

    const toggleCondition = (condition: IReference, composition: IReference) => {
        const selection = selections.find(
            (s) => s.composition === composition && s.condition === condition
        );

        if (selection) {
            const filteredSelections = selections.filter((s) => s !== selection);
            setSelections(filteredSelections);
        } else {
            const tempSelections = [
                ...selections,
                {
                    composition,
                    condition,
                    resources: [],
                },
            ];
            setSelections(tempSelections);
        }
    };

    const toggleEntry = (entry: IReference, condition: IReference, composition: IReference) => {
        const tempSelections = [...selections];
        const selection = tempSelections.find(
            (s) => s.composition === composition && s.condition === condition
        );

        if (selection) {
            const index = tempSelections.indexOf(selection);
            const resource = selection.resources.find((r) => r === entry);
            if (resource) {
                const filteredResources = selection.resources.filter((r) => r !== entry);
                tempSelections[index].resources = filteredResources;
            } else {
                tempSelections[index].resources.push(entry);
            }

            setSelections(tempSelections);
        }
    };

    return (
        <SelectionContext.Provider value={{ selections, toggleCondition, toggleEntry }}>
            {children}
        </SelectionContext.Provider>
    );
};

export default SelectionProvider;
