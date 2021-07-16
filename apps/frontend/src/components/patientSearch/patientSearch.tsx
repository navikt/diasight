import React, { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatientResults } from "./patientResults";
import { formatBirthdate } from "./utils/patient-birthdate";
import { Search } from "@navikt/ds-icons/cjs";
import style from "./patientSearch.module.less";
import { Sidetittel, Undertittel } from "nav-frontend-typografi";

type FormValues = {
    searchKeyword: string
}

export const PatientSearch: FC = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const [birthdate, setBirthdate] = useState("");

    const search = (data: FormValues) => {
        setBirthdate(formatBirthdate(data.searchKeyword));
    }

    return <div className={style.wrapper}>
        <div className={style.searchWrapper}>
            <form autoComplete="off" onSubmit={handleSubmit(search)}>
                <input className={style.input} placeholder="Søk etter pasient basert på personnumer" {...register("searchKeyword")} id="searchKeyword" />
                <Search className={style.icon} onClick={handleSubmit(search)} />
            </form>
        </div>
        <div className={style.resultsWrapper}>
            {birthdate ? <PatientResults birthdate={birthdate} /> : null}
        </div>
    </div>
}