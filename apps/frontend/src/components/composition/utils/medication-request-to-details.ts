import { IMedicationRequest } from "@ahryman40k/ts-fhir-types/lib/R4";

export const medicationRequestToDetails = (medicationRequest: IMedicationRequest): string[] => {
    const numeratorValue =
        (medicationRequest?.dosageInstruction ?? [])[0]?.maxDosePerPeriod?.numerator?.value ??
        "ukjent";
    const numeratorUnit =
        (medicationRequest?.dosageInstruction ?? [])[0]?.maxDosePerPeriod?.numerator?.unit ??
        "ukjent";

    const denominatorValue =
        (medicationRequest?.dosageInstruction ?? [])[0]?.maxDosePerPeriod?.denominator?.value ??
        "ukjent";
    const denominatorUnit =
        (medicationRequest?.dosageInstruction ?? [])[0]?.maxDosePerPeriod?.denominator?.unit ??
        "ukjent";

    const quantityValue =
        medicationRequest?.dispenseRequest?.initialFill?.quantity?.value ?? "ukjent";
    const quantityUnit =
        medicationRequest?.dispenseRequest?.initialFill?.quantity?.unit ?? "ukjent";

    const durationValue =
        medicationRequest?.dispenseRequest?.initialFill?.duration?.value ?? "ukjent";
    const durationUnit =
        medicationRequest?.dispenseRequest?.initialFill?.duration?.unit ?? "ukjent";

    const repeats = medicationRequest?.dispenseRequest?.numberOfRepeatsAllowed ?? "";

    const details = [
        `Dose: ${numeratorValue} ${numeratorUnit} i løpet av ${denominatorValue} ${denominatorUnit}`,
        `Totalt: ${quantityValue} ${quantityUnit} i løpet av ${durationValue} ${durationUnit}`,
        `Reiterasjoner: ${repeats}`,
    ];

    return details;
};
