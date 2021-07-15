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

    return <div className={style.wrapper}>
        <div className={style.searchWrapper}>
            <form>
                <label htmlFor="searchKeyword"></label>
                <input className={style.input} placeholder="Søk etter pasient basert på personnumer" {...register("searchKeyword")} id="searchKeyword" />
                <Search className={style.icon} onClick={handleSubmit((data) => {
                    setBirthdate(formatBirthdate(data.searchKeyword));
                })} />
            </form>
        </div>
        <div className={style.resultsWrapper}>
            {birthdate ? <PatientResults birthdate={birthdate} /> : null}
        </div>
    </div>
}