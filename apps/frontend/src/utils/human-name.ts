import { HumanNameUseKind, IHumanName } from "@ahryman40k/ts-fhir-types/lib/R4";

export const filterHumanNameOnUse = (names: IHumanName[], use: HumanNameUseKind) => {
    const result = names.find((name) => { return name.use === use });
    return result ? result : null;
}

export const humanNameToString = (name: IHumanName) => {
    if (!name.given || !name.family || name.use === HumanNameUseKind._anonymous) return "Anonym";
    return name.given?.join(" ") + " " + name.family;
}