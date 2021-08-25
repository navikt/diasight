import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IPractitioner } from "@ahryman40k/ts-fhir-types/lib/R4";
import { AuthStateResponse } from "@diasight/linkedin";


interface AppContextProps {
    authState: AuthStateResponse,
    user?: IPractitioner;
    loading: boolean;
}

const AppContext = React.createContext<Partial<AppContextProps>>({});

const AppContextProvider = (props: any) => {
    const [authState, setAuthState] = useState<AuthStateResponse>({
        isAuthenticated: false,
        loginUrl: undefined,
        logoutUrl: undefined,
    });
    const [user, setUser] = useState<IPractitioner>();
    const [loading, isLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetch() {
            isLoading(true);
            const res = await axios.get("/auth/state");
            if(res.data) setAuthState(res.data);
            if (res.data.isAuthenticated) {
                const res = await axios.get("/api/user");
                setUser(res.data);
            }
        }

        fetch().finally(() => isLoading(false));
    }, []);

    const context: AppContextProps = {
        user,
        loading,
        authState,
    };
    return (
        <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
    );
};
const useAppContext = () => useContext(AppContext);
export { useAppContext, AppContextProvider, AppContext };
