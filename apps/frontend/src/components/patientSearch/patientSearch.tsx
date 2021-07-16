import React, { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatientResults } from "./patientResults";
import { Search } from "@navikt/ds-icons/cjs";
import style from "./patientSearch.module.less";

type FormValues = {
    searchKeyword: string
}

export const PatientSearch: FC = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const [identifier, setIdentifier] = useState("");

    const search = (data: FormValues) => {
        setIdentifier(data.searchKeyword)
    }

    return <div className={style.wrapper}>
        <div className={style.searchWrapper}>
            <form autoComplete="off" onSubmit={handleSubmit(search)}>
                <input className={style.input}
                    placeholder="Søk etter pasient basert på personnumer"
                    {...register("searchKeyword")}
                    id="searchKeyword" />
                <Search className={style.icon} onClick={handleSubmit(search)} />
            </form>
        </div>
        <div className={style.resultsWrapper}>
            {identifier ? <PatientResults identifier={identifier} /> : null}
        </div>
    </div>
}