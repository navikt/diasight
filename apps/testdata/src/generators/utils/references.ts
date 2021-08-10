import { IReference, IResourceList } from "@ahryman40k/ts-fhir-types/lib/R4";

export const navReference: IReference = {
    reference: "Organization/7571610c-3dca-4c95-b0cb-468554c457e7",
    display: "NAV",
};

export const hospitalReference: IReference = {
    reference: "Organization/" + 321,
    display: "Ullevålsæther riks anstalt",
};

export const questionnaireReference: IReference = {
    reference: "Organization/" + 321,
    display: "Ullevålsæther riks anstalt",
};

export const ref = (resource: IResourceList): IReference => {
    return {
        reference: resource.resourceType + "/" + resource.id,
    };
};
