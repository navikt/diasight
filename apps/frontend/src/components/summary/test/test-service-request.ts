export const testServiceRequest = {
    resourceType: "ServiceRequest",
    id: "17",
    meta: {
        versionId: "1",
        lastUpdated: "2021-07-29T13:55:19.801+00:00",
    },
    status: "active",
    intent: "order",
    priority: "urgent",
    code: {
        coding: [
            {
                system: "https://finnkode.ehelse.no/#ncmpncsp/0/0/0/2911577",
                code: "NGB14",
            },
        ],
        text: "Implantasjon av flere primære delprotesekomponenter i kneledd med sement",
    },
    subject: {
        reference: "Patient/1",
    },
    occurrenceDateTime: "2021-07-21",
    authoredOn: "2021-07-14",
    requester: {
        reference: "Practitioner/2",
    },
    performer: [
        {
            reference: "Practitioner/3",
        },
    ],
};
