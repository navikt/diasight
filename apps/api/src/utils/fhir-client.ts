import axios from "axios";
import * as env from "env-var";
import { GoogleAuth } from "google-auth-library";

const baseURL = env.get("FHIR_URL").required().asUrlString();

const fhirClient = axios.create({ baseURL });
const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/cloud-platform",
});
auth.getRequestHeaders().then(headers => {
    fhirClient.defaults.headers.common = Object.assign(fhirClient.defaults.headers.common, headers);
});

fhirClient.interceptors.request.use(req => {
    return req;
});
export default fhirClient;
