import {
    IComposition,
    ICondition,
    IMedicationRequest,
    IObservation,
    IReference,
    IServiceRequest,
} from "@ahryman40k/ts-fhir-types/lib/R4";

type CompositionReferenceEntry = {
    reference: string;
    type: string;
    display: string;
};

export const updateComposition = (
    composition: IComposition,
    condition: ICondition,
    resources: IReference[]
) => {
    const existingCondition = composition.section?.find(
        (e) => e.focus?.reference === condition.resourceType + "/" + condition.id
    );

    if (existingCondition) {
        console.log("exists");
        resources.forEach((resource) => existingCondition.entry?.push(referenceToEntry(resource)));
    } else {
        addConditionSection(composition, condition, resources);
    }

    console.log("doesn't exist");
};

const addConditionSection = (
    composition: IComposition,
    condition: ICondition,
    resources: IReference[]
) => {
    const coding = {
        coding: [
            {
                system: "http://loinc.org",
                code: "11329-0",
            },
        ],
        text: "History of general Narrative - Reported",
    };

    const orderBy = {
        coding: [
            {
                code: "event-date",
            },
        ],
    };

    const sectionEntry = {
        title: condition.code?.text,
        code: coding,
        focus: referenceToEntry(condition as IReference),
        orderedBy: orderBy,
        entry: resources.map((resource) => referenceToEntry(resource)),
    };

    composition.section?.push(sectionEntry);
};

const referenceToEntry = (reference: IReference): CompositionReferenceEntry => {
    if (reference.type === "Observation") {
        const observation: IObservation = reference as IObservation;
        return {
            reference: observation.resourceType + "/" + observation.id,
            type: observation.resourceType,
            display: observation?.code?.text ? observation.code.text : "",
        };
    } else if (reference.type === "ServiceRequest") {
        const serviceRequest: IServiceRequest = reference as IServiceRequest;
        return {
            reference: serviceRequest.resourceType + "/" + serviceRequest.id,
            type: serviceRequest.resourceType,
            display: serviceRequest?.code?.text ? serviceRequest.code.text : "",
        };
    } else if (reference.type === "MedicationRequest") {
        const medicationRequest: IMedicationRequest = reference as IMedicationRequest;
        return {
            reference: medicationRequest.resourceType + "/" + medicationRequest.id,
            type: medicationRequest.resourceType,
            display: medicationRequest?.medicationCodeableConcept?.text
                ? medicationRequest.medicationCodeableConcept.text
                : "",
        };
    } else if (reference.type === "Condition") {
        const condition: ICondition = reference as ICondition;
        return {
            reference: condition.resourceType + "/" + condition.id,
            type: condition.resourceType,
            display: condition?.code?.text ? condition.code.text : "",
        };
    } else {
        return {
            reference: "",
            type: "",
            display: "",
        };
    }
};
