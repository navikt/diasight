import { AddressUseKind, IAddress } from "@ahryman40k/ts-fhir-types/lib/R4";

export const patientHomeAdressToString = (addresses: IAddress[]) => {
    if (!addresses || !addresses.length) return "Hjemmeadresse ikke tilgjengelig";
    const home = addresses.find((a) => { return a.use === AddressUseKind._home });

    return home?.line?.join(" ") + ", " + home?.postalCode + " " + home?.city;
}