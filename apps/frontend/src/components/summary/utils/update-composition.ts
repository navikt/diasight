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
import clonedeep from "lodash.clonedeep";

export const summaryToTransactionBundle = (summary: SummaryChange[]) => {
    const compositions: IComposition[] = [];
    const resources: IResourceList[] = [];

    const sum: SummaryChange[] = clonedeep(summary);

    sum.map((s) =>
        s.resources.map((r) => {
            if (!resources.includes(r)) resources.push(r);
        })
    );

    for (const s of sum) {
        const localComp = compositions.find((c) => c.id === s.composition.id);
        const index = localComp ? compositions.indexOf(localComp) : -1;

        const updatedComposition = addResourcesToComposition(
            s.composition,
            s.condition,
            s.resources
        );

        console.log(index);

        if (index !== -1) {
            compositions[index] = { ...updatedComposition };
        } else {
            compositions.push({ ...updatedComposition });
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

const addResourcesToComposition = (
    composition: IComposition,
    condition: ICondition,
    resources: IResourceList[]
) => {
    const conditionSection = findCompositionSection(composition, condition);

    if (conditionSection && composition.section) {
        const index = composition.section.indexOf(conditionSection);

        resources.map((r) => {
            const reference: IReference = { reference: r.id };
            if (!conditionSection.entry) conditionSection.entry = [];
            conditionSection.entry = [...conditionSection.entry, reference];
        });

        composition.section[index] = { ...conditionSection };
    }

    return composition;
};

const findCompositionSection = (composition: IComposition, condition: ICondition) => {
    return composition.section?.find((s) => s.focus?.reference === "Condition/" + condition.id);
};
