import { cleanup, getByText, render, waitFor } from "@testing-library/react";
import App from "./app";
import { mockQuestionnaireResponses } from "./mock-data";

describe("App", () => {
    afterEach(() => {
        // @ts-ignore
        delete global["fetch"];
        cleanup();
    });

    it("should render successfully", async () => {
        global["fetch"] = jest.fn().mockResolvedValueOnce({
            json: () => (mockQuestionnaireResponses),
        });

        const { container } = render(<App />);

        await waitFor(() => getByText(container, "Unauthenticated"));
    });
});
