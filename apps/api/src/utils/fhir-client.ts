import axios from "axios";
import * as env from "env-var";

const baseURL = env.get("FHIR_URL").required().asUrlString();

const fhirClient = axios.create({ baseURL });

fhirClient.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export default fhirClient;
