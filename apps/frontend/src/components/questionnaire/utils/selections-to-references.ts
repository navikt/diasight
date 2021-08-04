import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import { EntrySelection } from "../../../layouts/contexts/selection-context";

export const selectionsToReferences = (selections: EntrySelection[]) => {
    const references: IReference[] = [];

    selections.map(({ composition, condition, resources }) => {
        references.push({
            reference: `Composition/${composition.id}`,
            id: composition.id,
            type: composition.resourceType,
        });

        references.push({
            reference: `Condition/${condition.id}`,
            id: condition.id,
            type: condition.resourceType,
            display: condition.code?.text,
        });

        resources.map((resource) => {
            references.push({
                reference: `${resource.resourceType}/${resource.id}`,
                id: resource.id,
                type: resource.resourceType,
            });
        });
    });

    return references;
};
