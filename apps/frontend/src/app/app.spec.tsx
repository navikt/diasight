import { cleanup, getByText, render, waitFor } from "@testing-library/react";
import App from "./app";
import { mockPatient } from "./mock-data";

describe("App", () => {
    afterEach(() => {
        delete global["fetch"];
        cleanup();
    });

    it("should render successfully", async () => {
        global["fetch"] = jest.fn().mockResolvedValueOnce({
            json: () => (mockPatient
            ),
        });

        const { baseElement } = render(<App />);

        await waitFor(() => getByText(baseElement, "[{\"family\":\"Aase\",\"given\":[\"Jenny\"]}]"));
    });
});
