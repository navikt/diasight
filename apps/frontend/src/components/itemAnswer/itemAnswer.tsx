import { IQuestionnaire } from '@ahryman40k/ts-fhir-types/lib/R4'

import React from 'react'
import { FC } from 'react'

interface IProps {
    setAnswer: (answer: string) => void;
    answer: string;
}


export const Answer: FC<IProps> = ({ answer, setAnswer }) => {
    return (
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
    )
}