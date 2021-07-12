import { ContactPointSystemKind, IContactPoint } from "@ahryman40k/ts-fhir-types/lib/R4";

const filterPatientTelecom = (telecom: IContactPoint[], system: ContactPointSystemKind) => {
    if (!telecom || !telecom.length) return null;
    const contactPoint = telecom.find((n) => { return n.system === system });

    return contactPoint;
}

export const patientPhoneToString = (telecom: IContactPoint[]) => {
    const number = filterPatientTelecom(telecom, ContactPointSystemKind._phone);

    return number ? number.value : "Ikke tilgjengelig";
}

export const patientEmailToString = (telecom: IContactPoint[]) => {
    const email = filterPatientTelecom(telecom, ContactPointSystemKind._email);

    return email ? email.value : "Ikke tilgjengelig";
}
