import { cleanup, getByText, render, waitFor } from "@testing-library/react";
import App from "./app";
import { mockQuestionnaire } from "./mock-data";

describe("App", () => {
    afterEach(() => {
        delete global["fetch"];
        cleanup();
    });

    it("should render successfully", async () => {
        global["fetch"] = jest.fn().mockResolvedValueOnce({
            json: () => (mockQuestionnaire),
        });

        const { baseElement } = render(<App />);

        await waitFor(() => getByText(baseElement, "\"Hello World!\""));
    });
});
