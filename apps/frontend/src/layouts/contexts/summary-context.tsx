import { IObservation, IReference, IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { createContext, FC, useState } from "react";

type SummaryChange = {
    resource: IObservation;
    ref: IReference;
};

type SummaryContextState = {
    changes: SummaryChange[];
    getResourcesByCondition: (condition: IReference) => IResourceList[];
    getUniqueConditions: () => IReference[];
    addChange: (change: SummaryChange) => void;
    removeChange: (change: SummaryChange) => void;
    updateChange: (change: SummaryChange) => void;
};

const contextDefaultValues: SummaryContextState = {
    changes: [],
    getResourcesByCondition: (condition: IReference): IResourceList[] => [],
    getUniqueConditions: () => [],
    addChange: (change: SummaryChange) => null,
    removeChange: (change: SummaryChange) => null,
    updateChange: (change: SummaryChange) => null,
};

export const SummaryContext = createContext<SummaryContextState>(contextDefaultValues);

const SummaryProvider: FC = ({ children }) => {
    const [changes, setChanges] = useState<SummaryChange[]>(contextDefaultValues.changes);

    const getUniqueConditions = () => {
        const uniqueChanges: IReference[] = [];
        changes.map((c) => {
            if (!uniqueChanges.includes(c.ref)) {
                return uniqueChanges.push(c.ref);
            }
            return false;
        });

        return uniqueChanges;
    };

    // Returns all changes referenced by their grouped condition
    const getResourcesByCondition = (condition: IReference) => {
        const filteredChanges = changes.filter((c) => c.ref === condition);
        return filteredChanges.map((c) => c.resource);
    };

    const addChange = (change: SummaryChange) => {
        setChanges([...changes, change]);
    };

    const removeChange = (change: SummaryChange) => {
        const filteredChanges = changes.filter(
            (c) => c.resource !== change.resource && c.ref !== change.ref
        );
        setChanges(filteredChanges);
    };

    const updateChange = (change: SummaryChange) => {
        const updatedChanges = [...changes];
        updatedChanges[changes.indexOf(change)] = change;
        setChanges(updatedChanges);
    };

    return (
        <SummaryContext.Provider
            value={{
                changes,
                getResourcesByCondition,
                getUniqueConditions,
                addChange,
                removeChange,
                updateChange,
            }}>
            {children}
        </SummaryContext.Provider>
    );
};

export default SummaryProvider;
