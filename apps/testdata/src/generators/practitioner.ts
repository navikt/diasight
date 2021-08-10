import { IPractitioner } from "@ahryman40k/ts-fhir-types/lib/R4";

export const generatePractitioner = (): IPractitioner => {
    return {
        id: "b51d438e-6563-4eb1-84c9-1034b21ee7ef",
        resourceType: "Practitioner",
    };
};
