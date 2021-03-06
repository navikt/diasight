export const testMedicationRequest = {
    resourceType: "MedicationRequest",
    id: "6",
    status: "active",
    intent: "order",
    medicationCodeableConcept: {
        text: "Paracetamol",
    },
    subject: {
        reference: "Patient/1",
    },
    authoredOn: "2021-07-15",
    requester: {
        reference: "Practitioner/2",
    },
    dosageInstruction: [
        {
            asNeededBoolean: true,
            maxDosePerPeriod: {
                numerator: {
                    value: 4,
                    unit: "piller",
                },
                denonimator: {
                    value: 1,
                    unit: "dag",
                },
            },
        },
    ],
    dispenseRequest: {
        initialFill: {
            quantity: {
                value: 20,
                unit: "piller",
            },
            duration: {
                value: 1,
                unit: "month",
                code: {
                    coding: [
                        {
                            system: "http://unitsofmeasure.org",
                            code: "month",
                        },
                    ],
                },
            },
        },
        validityPeriod: {
            start: "2021-07-15",
            end: "2021-08-15",
        },
        numberOfRepeatsAllowed: 0,
    },
    substitution: {
        allowedBoolean: false,
    },
};
