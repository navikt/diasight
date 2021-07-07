export interface IAppointment {
    status: AppointmentStatus; // Should be enum
    // More to come
}

enum AppointmentStatus {
    Proposed = "proposed",
    Pending = "pending",
    Booked = "booked",
    Arrived = "arrived",
    Fulfilled = "fulfilled",
    Cancelled = "cancelled",
    NoShow = "noshow",
    EnteredInError = "entered-in-error",
    CheckedIn = "checked-in",
    WaitList = "waitlist"
}