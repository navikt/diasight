export const referenceToUrl = (reference: string): string => {
    const referenceType = reference.split("/")[0];
    const referenceId = reference.split("/")[1];

    switch (referenceType) {
        case "Patient":
            return "pasient/" + referenceId;
        default:
            return "";
    }
};
