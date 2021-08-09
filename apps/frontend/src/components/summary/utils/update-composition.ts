import {
    BundleTypeKind,
    Bundle_RequestMethodKind,
    IBundle,
    IComposition,
    ICondition,
    IReference,
    IResourceList,
} from "@ahryman40k/ts-fhir-types/lib/R4";
import { SummaryChange } from "../../../layouts/contexts/summary-context";

export const summaryToTransactionBundle = (summary: SummaryChange[]) => {
    const resources: IResourceList[] = [];
    summary.map((s) =>
        s.resources.map((r) => {
            if (!resources.includes(r)) resources.push(r);
        })
    );

    const compositions: IComposition[] = [];

    for (const s of summary) {
        const index = compositions.indexOf(s.composition);
        const updatedComposition = addResourceToComposition(
            s.composition,
            s.condition,
            s.resources
        );

        if (index !== -1) {
            compositions[index] = updatedComposition;
        } else {
            compositions.push(updatedComposition);
        }
    }

    const transactionBundle: IBundle = {
        resourceType: "Bundle",
        id: "bundle-transaction",
        type: BundleTypeKind._transaction,
        entry: [],
    };

    resources.map((r) => {
        transactionBundle.entry?.push({
            fullUrl: r.id,
            resource: r,
            request: { method: Bundle_RequestMethodKind._post, url: r.resourceType },
        });
    });

    compositions.map((c) => {
        transactionBundle.entry?.push({
            fullUrl: c.resourceType + "/" + c.id,
            resource: c,
            request: { method: Bundle_RequestMethodKind._put, url: `${c.resourceType}/${c.id}` },
        });
    });

    return transactionBundle;
};

const addResourceToComposition = (
    composition: IComposition,
    condition: ICondition,
    resources: IResourceList[]
) => {
    const conditionSection = findCompositionSection(composition, condition);

    if (conditionSection && composition.section) {
        const index = composition.section?.indexOf(conditionSection);

        resources.map((r) => {
            const reference: IReference = { reference: r.id };
            if (!conditionSection.entry) conditionSection.entry = [];
            conditionSection.entry = [...conditionSection.entry, reference];
        });

        composition.section[index] = conditionSection;
    }

    return composition;
};

const findCompositionSection = (composition: IComposition, condition: ICondition) => {
    return composition.section?.find((s) => s.focus?.reference === "Condition/" + condition.id);
};
