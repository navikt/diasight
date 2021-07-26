import { fetcher } from "../../../utils";
import useSWR from "swr";
import { IBundle_Entry, ITask } from "@ahryman40k/ts-fhir-types/lib/R4";

export const useHospitalTasks = (receiverId: string) => {
    const { data, error } = useSWR<IBundle_Entry[]>(`api/Task?owner=${receiverId}`, fetcher);

    //console.log(data[1].resource.requester.reference.includes("Organization"));

    return {
        hospitalTasks: data
            ?.map((task) => task.resource as ITask)
            .filter((task) => task.requester?.reference.includes("Practitioner")),
        isLoading: !error && !data,
        isError: error,
    };
};
