import { IAdverseEvent, IAppointment, ICondition, IProcedure } from './';

export interface IComposition {
    status: CompositionStatus;
    date: Date; // Is required. 
    title: string; // Human readable, is required.
    section: ISection;
}

export interface ISection {
    entry: ICondition;
    section?: ISubSection[];
}

interface ISubSection {
    title: string;
    entry: IAdverseEvent | IAppointment | IComposition | ICondition | IProcedure;
}

export enum CompositionStatus {
    Preliminary = "preliminary",
    Final = "final",
    Amended = "amended",
    EnteredInError = "entered-in-error",
}