import { HumanNameUseKind, IHumanName, IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { useEffect, useState } from "react";

const filterPatientName = (names: IHumanName[], use: HumanNameUseKind) => {
    const result = names.find((name) => { return name.use === use });
    return result ? result : null;
}

const patientNameToString = (name: IHumanName) => {
    if (!name.given || !name.family || name.use === HumanNameUseKind._anonymous) return "Anonym";
    return name.given?.join(" ") + " " + name.family;
}

export const usePatientName = (patient: IPatient, use: HumanNameUseKind = HumanNameUseKind._official) => {
    const [name, setName] = useState<string>("Ukjent");

    useEffect(() => {
        if (!patient || !patient.name) return;
        const selectedName = filterPatientName(patient.name, use);

        if (!selectedName) return;
        return setName(patientNameToString(selectedName));
    }, [patient, use]);

    return name;
}