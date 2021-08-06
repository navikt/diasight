import {
    IComposition,
    ICondition,
    IReference,
    IResourceList,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { createContext, FC, useState } from "react";

export type EntrySelection = {
    composition: IComposition;
    condition: ICondition;
    resources: IResourceList[];
};

type SelectionContextState = {
    selections: EntrySelection[];
    toggleCondition: (condition: ICondition, composition: IComposition) => void;
    toggleEntry: (entry: IResourceList, condition: ICondition, composition: IComposition) => void;
};

const contextDefaultValues: SelectionContextState = {
    selections: [],
    toggleCondition: () => null,
    toggleEntry: () => null,
};

export const SelectionContext = createContext<SelectionContextState>(contextDefaultValues);

const SelectionProvider: FC = ({ children }) => {
    const [selections, setSelections] = useState<EntrySelection[]>(contextDefaultValues.selections);

    const toggleCondition = (condition: ICondition, composition: IComposition) => {
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

    const toggleEntry = (
        entry: IResourceList,
        condition: ICondition,
        composition: IComposition
    ) => {
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
