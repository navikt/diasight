import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom";

import App from "./app/app";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/app-context";

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById("root"),
);
