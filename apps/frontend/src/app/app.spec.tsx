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
            json: () => ({
                patient: mockPatient
            }),
        });

        const baseElement = render(<App />).container;
        await waitFor(() => getByText(baseElement, "my message"));
    });
});
