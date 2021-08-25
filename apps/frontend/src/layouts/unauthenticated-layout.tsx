import React, { FC } from "react";
import { Innholdstittel } from "nav-frontend-typografi";

interface Props {
    loginUrl: string,
}

export const UnauthenticatedLayout: FC<Props> = ({ loginUrl }) => {
    return (
        <div>
            <Innholdstittel>Unauthenticated</Innholdstittel>
            <a href={loginUrl}>Logg inn</a>
        </div>
    );

};
