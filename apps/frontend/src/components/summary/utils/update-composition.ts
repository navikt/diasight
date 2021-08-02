import { BundleTypeKind, IBundle, IComposition, IComposition_Section, ICondition, IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";
import { SummaryChange } from "../../../layouts/contexts/summary-context";

export const summaryToTransactionBundle = (summary: SummaryChange[]) => {

    const resources: IResourceList[] = [];
    summary.map((s) => s.resources.map((r) => resources.push(r)));

    const compositions: IComposition[] = [];

    for (const s of summary) {
        const index = compositions.indexOf(s.composition);
        const updatedComposition = addResourceToComposition(s.composition, s.condition, s.resources);

        if(index !== -1) {
            compositions[index] = updatedComposition;
        } else {
            compositions.push(updatedComposition);
        }
    }


    console.log(compositions);
    console.log(resources);




    const transactionBundle: IBundle = {
        resourceType: "Bundle",
        id: "bundle-transaction",
        type: BundleTypeKind._transaction,
        entry: []

    }
    
    return;
}

const addResourceToComposition = (composition: IComposition, condition: ICondition, resources: IResourceList[]) => {
    const conditionSection = findCompositionSection(composition, condition);

    if(conditionSection && composition.section) {
        const index = composition.section?.indexOf(conditionSection);

        resources.map((r) => {
            if (!conditionSection.entry) conditionSection.entry = [];
            conditionSection.entry = [...conditionSection.entry, {reference: r.resourceType + "/" + r.id}]
        });

        composition.section[index] = conditionSection;
    }

    return composition;
}



const findCompositionSection = (composition: IComposition, condition: ICondition) => {
    return composition.section?.find((s) => s.focus?.reference === "Condition/" + condition.id);
};