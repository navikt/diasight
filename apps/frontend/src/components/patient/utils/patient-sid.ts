import { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";

const splitIdentifier = (id: string) => {
    return id.substr(0, 6) + " " + id.substr(6, id.length);
};

export const patientSIDToString = (patient: IPatient) => {
    const foundID = patient.identifier?.find((id) => {
        return id.system === "urn:oid:2.16.578.1.12.4.1.4.1";
    })

    if(foundID?.value) return splitIdentifier(foundID?.value);

    return "Ikke tilgjengelig";
}