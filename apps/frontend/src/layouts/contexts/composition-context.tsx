import { IReference } from "@ahryman40k/ts-fhir-types/lib/R4";
import React, { createContext, FC, useState } from "react";

type CompositionContextState = {
    references: IReference[];
    toggleReference: (rereferencef: IReference)  => void;
}

const contextDefaultValues: CompositionContextState = {
    references: [],
    toggleReference: () => null
}

export const CompositionContext = createContext<CompositionContextState>(contextDefaultValues);

const CompositionProvider: FC = ({children}) => {
    const [references, setReferences] = useState<IReference[]>(contextDefaultValues.references);

    // Add/Remove reference from state 
    const toggleReference = (reference: IReference) => {
        if(references?.includes(reference)) {
            const filteredRefs = references.filter((ref) => ref !== reference);
            setReferences(filteredRefs);
            return; 
        }
        setReferences([...references, reference]);
    }

    return (
        <CompositionContext.Provider value={{references, toggleReference}}>
            {children}
        </CompositionContext.Provider>
    );
}

export default CompositionProvider;