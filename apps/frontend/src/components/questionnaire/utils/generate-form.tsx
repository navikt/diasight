import { IQuestionnaire, IQuestionnaire_Item, Questionnaire_ItemTypeKind } from "@ahryman40k/ts-fhir-types/lib/R4";
import React from "react";
import { Input, Label, Radio, RadioGruppe } from 'nav-frontend-skjema';
import AlertStripe from 'nav-frontend-alertstriper';


export const generateFHIRForm = (question: IQuestionnaire_Item) => {
    switch(question.type) {
        case Questionnaire_ItemTypeKind._string:
            return (<Input type="text" label={question.text} key={question.linkId}/>);
        case Questionnaire_ItemTypeKind._integer: 
            return (<Input type="text" inputMode="numeric" pattern="[0-9]*" label={question.text} key={question.linkId}/>);
        case Questionnaire_ItemTypeKind._boolean: 
            return (
                <RadioGruppe legend={question.text}  key={question.linkId}>
                    <Radio label={"Ja"} name={"bool" + question.linkId}/>
                    <Radio label={"Nei"} name={"bool" + question.linkId}/>
                </RadioGruppe>
            );
        case Questionnaire_ItemTypeKind._reference: 
            return (<AlertStripe key={question.linkId} type="info">Vennligst velg diagnoser fra høyre side for å legge de til i skjemaet.</AlertStripe>)
        default: 
            return null;
    }

}