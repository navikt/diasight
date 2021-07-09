import { ICodeableConcept } from "@ahryman40k/ts-fhir-types/lib/R4"

export const maritalStatusToNorwegian = (status: ICodeableConcept) => {
    if (!status || !status.coding) return "Ukjent";
    const code = status.coding[0].code;

    switch (code) {
        case "A":
            return "Annullert";
        case "D":
            return "Skilt";
        case "L":
            return "Separert";
        case "M":
            return "Gift";
        case "S":
            return "Ugift";
        case "T":
            return "Samboerskap";
        case "U":
            return "Ugift";
        case "W":
            return "Enke";
        default:
            return "Ukjent";
    }

}