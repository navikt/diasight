import {
    IComposition,
    ICondition,
    IContactPoint,
    IReference,
    IResourceList,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { createContext, FC, useState } from "react";

export type SummaryChange = {
    composition: IComposition;
    condition: ICondition;
    resources: IResourceList[];
};

type SummaryContextState = {
    changes: SummaryChange[];
    getResourcesFromChange: (condition: ICondition, composition: IComposition) => IResourceList[];
    findResourceByType: (
        composition: IComposition,
        condition: ICondition,
        type: string
    ) => IResourceList | undefined;
    addResource: (
        composition: IComposition,
        condition: ICondition,
        resource: IResourceList
    ) => void;
    removeResource: (
        composition: IComposition,
        condition: ICondition,
        resource: IResourceList
    ) => void;
    updateResource: (
        composition: IComposition,
        condition: ICondition,
        resource: IResourceList
    ) => void;
};

const contextDefaultValues: SummaryContextState = {
    changes: [],
    getResourcesFromChange: (
        condition: ICondition,
        composition: IComposition
    ): IResourceList[] => [],
    findResourceByType: (composition: IComposition, condition: ICondition, type: string) => {
        return undefined;
    },
    addResource: (composition: IComposition, condition: ICondition, resource: IResourceList) =>
        null,
    removeResource: (composition: IComposition, condition: ICondition, resource: IResourceList) =>
        null,
    updateResource: (composition: IComposition, condition: ICondition, resource: IResourceList) =>
        null,
};

export const SummaryContext = createContext<SummaryContextState>(contextDefaultValues);

const SummaryProvider: FC = ({ children }) => {
    const [changes, setChanges] = useState<SummaryChange[]>(contextDefaultValues.changes);

    // Returns all changes referenced by their grouped condition
    const getResourcesFromChange = (condition: ICondition, composition: IComposition) => {
        const change = changes.find(
            (c) => c.condition === condition && c.composition === composition
        );
        return change?.resources || [];
    };

    const findChange = (composition: IComposition, condition: ICondition) => {
        const selection = changes.find((c) => {
            return c.composition === composition && c.condition === condition;
        });

        return selection;
    };

    const addResource = (
        composition: IComposition,
        condition: ICondition,
        resource: IResourceList
    ) => {
        const selection = findChange(composition, condition);

        if (selection) {
            const tempChanges = [...changes];
            const index = tempChanges.indexOf(selection);
            tempChanges[index].resources.push(resource);

            setChanges(tempChanges);
        } else {
            setChanges([...changes, { composition, condition, resources: [resource] }]);
        }
    };

    const removeResource = (
        composition: IComposition,
        condition: ICondition,
        resource: IResourceList
    ) => {
        const tempChanges = [...changes];
        const change = findChange(composition, condition);

        if (change) {
            const index = tempChanges.indexOf(change);
            tempChanges[index].resources = change.resources.filter((r) => r !== resource);

            if (change.resources.length === 0) {
                setChanges(tempChanges.filter((c) => c !== tempChanges[index]));
                return;
            }

            setChanges(tempChanges);
        }
    };

    // Find resource by ID or ResourceType, what if there are several?
    const updateResource = (
        composition: IComposition,
        condition: ICondition,
        resource: IResourceList
    ) => {
        const updatedChanges = [...changes];
        const change = findChange(composition, condition);

        if (change) {
            const changeIndex = updatedChanges.indexOf(change);
            const resourceIndex = updatedChanges[changeIndex].resources.indexOf(resource);

            updatedChanges[changeIndex].resources[resourceIndex] = resource;
            setChanges(updatedChanges);
        }
    };

    const findResourceByType = (composition: IComposition, condition: ICondition, type: string) => {
        const change = findChange(composition, condition);
        return change?.resources.find((r) => r.resourceType === type);
    };

    return (
        <SummaryContext.Provider
            value={{
                changes,
                getResourcesFromChange,
                findResourceByType,
                addResource,
                removeResource,
                updateResource,
            }}>
            {children}
        </SummaryContext.Provider>
    );
};

export default SummaryProvider;
