import React, { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatientResult } from "./patientResult";
import { formatBirthdate } from "./utils/patient-birthdate";

type FormValues = {
    searchKeyword: string
}

export const PatientSearch: FC = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const [birthdate, setBirthdate] = useState("");

    return <>
        <h1>Pasient liste</h1>
        <label htmlFor="searchKeyword">Vennligst oppgi pasientens fødselsdato:</label>
        <form onSubmit={handleSubmit((data) => {
            setBirthdate(formatBirthdate(data.searchKeyword));
        })}>
            <input {...register("searchKeyword")} id="searchKeyword" />
            <input type="submit" />
        </form>
        <div>
            <PatientResult birthdate={birthdate} />
        </div>
    </>
}