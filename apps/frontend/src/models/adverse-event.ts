export interface IAdverseEvent {
    actuality: Actuality;
}

enum Actuality {
    Actual = "actual",
    Potential = "potential",
}