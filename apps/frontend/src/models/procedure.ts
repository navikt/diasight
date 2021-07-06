export interface IProcedure {
    status: ProcedureStatus;
}

enum ProcedureStatus {
    Preparation = "preparation",
    InProgress = "in-progress",
    NotDone = "not-done",
    OnHold = "on-hold",
    Stopped = "stopped",
    Completed = "completed",
    EnteredInError = "entered-in-error",
    Unkown = "unkown",
}