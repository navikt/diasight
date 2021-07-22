import { ICodeableConcept } from "@ahryman40k/ts-fhir-types/lib/R4";

export const findICPCCode = (code: ICodeableConcept) => {
    return code.coding?.find(c => c.system === "ICPC");
}