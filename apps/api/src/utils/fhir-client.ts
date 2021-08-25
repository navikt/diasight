import axios from "axios";
import * as env from "env-var";
import { GoogleAuth } from "google-auth-library";

const baseURL = env.get("FHIR_URL").required().asUrlObject();

const fhirClient = axios.create({ baseURL: baseURL.toString() });

/**
 * Skrur på dette kun om det kjøres mot Google Health API
 */
if (baseURL.hostname === "healthcare.googleapis.com") {
    const auth = new GoogleAuth({
        scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
    fhirClient.interceptors.request.use(async (req) => {
        const headers = await auth.getRequestHeaders();
        req.headers = Object.assign(req.headers, headers);
        return req;
    });
}

export default fhirClient;
