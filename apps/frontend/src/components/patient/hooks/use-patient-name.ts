import { HumanNameUseKind, IPatient } from "@ahryman40k/ts-fhir-types/lib/R4";
import { filterHumanNameOnUse, humanNameToString } from "../../../utils";
import { useEffect, useState } from "react";



export const usePatientName = (patient: IPatient, use: HumanNameUseKind = HumanNameUseKind._official) => {
    const [name, setName] = useState<string>("Ukjent");

    useEffect(() => {
        if (!patient || !patient.name) return;
        const selectedName = filterHumanNameOnUse(patient.name, use);

        if (!selectedName) return;
        return setName(humanNameToString(selectedName));
    }, [patient, use]);

    return name;
}