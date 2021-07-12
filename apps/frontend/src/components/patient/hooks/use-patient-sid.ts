import { IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { useEffect, useState } from "react";

const splitIdentifier = (id: string) => {
    return id.substr(0, 6) + " " + id.substr(6, id.length);
}

export const usePatientSID = (patient: IPatient) => {
    const [id, setID] = useState<string>("");

    useEffect(() => {
        if (!patient || !patient.identifier) return;
        const foundID = patient.identifier?.find((i) => {
            return i.system === "urn:oid:2.16.578.1.12.4.1.4.1";
        });

        return !foundID || !foundID.value ? setID("Ikke tilgjengelig") : setID(foundID.value);
    }, [patient]);

    return splitIdentifier(id);
}