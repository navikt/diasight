import { ContactPointSystemKind, IPractitioner } from "@ahryman40k/ts-fhir-types/lib/R4";
import * as fs from "fs";
import { LinkedinUser } from "@diasight/linkedin";


export const linkedinToPractitioneerMapper = (linkedInUser: LinkedinUser) => {
    const practitioner: IPractitioner = {
        resourceType: "Practitioner",
        active: true,
        identifier: [{
            system: linkedInUser.provider,
            value: linkedInUser.id,
        }],
        name: [{
            "family": linkedInUser.name.familyName,
            "given": [
                linkedInUser.name.givenName,
            ],
            "prefix": [
                "Dr.",
            ],
        }],
        telecom: [],
        photo: [],
    };
    linkedInUser.emails.forEach(email => {
        practitioner.telecom.push({
            system: ContactPointSystemKind._email,
            value: email.value,
        });
    });
    linkedInUser.photos.forEach(photo => {
        practitioner.photo.push({
            url: photo.value,
        });
    });
    return practitioner;
};
