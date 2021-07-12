import { cleanup, getByText, render, waitFor } from "@testing-library/react";
import App from "./app";
import { mockQuestionnaireResponses } from "./mock-data";

describe("App", () => {
    afterEach(() => {
        delete global["fetch"];
        cleanup();
    });

    it("should render successfully", async () => {
        global["fetch"] = jest.fn().mockResolvedValueOnce({
            json: () => (mockQuestionnaireResponses),
        });

        const { baseElement } = render(<App />);

        await waitFor(() => getByText(baseElement, "\"http://mitt-domene.no/fhir/Questionnaire/workshop-skjema\""));
    });
});
