export const testObservation = {
    resourceType: "Observation",
    id: "7",
    status: "registered",
    code: {
        text: "Ortostatisk blodtrykksmåling",
        coding: [
            {
                code: "FYFX10",
                system: "https://finnkode.ehelse.no/#ncmpncsp/0/0/0/2939228",
            },
        ],
    },
    issued: "2021-05-18",
    performer: [
        {
            reference: "Practitioner/2",
            type: "Practitioner",
        },
    ],
    note: [
        {
            text: "Normalt blodtrykk",
        },
    ],
};
