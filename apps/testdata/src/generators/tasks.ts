import { ITask, TaskIntentKind, TaskStatusKind } from "@ahryman40k/ts-fhir-types/lib/R4";
import { hospitalReference, navReference, ref } from "./utils/references";
import { generatePractitioner } from "./practitioner";
import { generateQuestionnaire } from "./questionnaire";

export const generateTask = (id) => {
    const task: ITask = {
        id: id,
        resourceType: "Task",
        status: TaskStatusKind._accepted,
        owner: ref(generatePractitioner()),
        intent: TaskIntentKind._order,
    };
    return task;
};

export const generateNavTask = (id) => {
    const task = generateTask(id);
    task.requester = navReference;
    task.focus = ref(generateQuestionnaire());
    return task;
};

export const generateHospitalTask = (id) => {
    const task = generateTask(id);
    task.requester = hospitalReference;
    task.focus = {
        reference: "Observation/123",
    };
    return task;
};
