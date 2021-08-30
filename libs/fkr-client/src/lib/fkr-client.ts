import axios from "axios";
import * as flatCache from "flat-cache";
import { Cache } from "flat-cache";
import { JWT } from "jose";
import { IdTokenClaims } from "openid-client";
import { IBundle_Entry } from "@ahryman40k/ts-fhir-types/lib/R4";
import * as env from "env-var";
import * as fs from "fs";
import { EOL } from "os";

const getFreshToken = async () => {
    const config = getConfig();
    const params = new URLSearchParams({
        grant_type: "client_credentials",
    });
    const result = await axios.post(config.stsUrl, params, {
        auth: {
            username: config.clientId,
            password: config.accessKey,
        },
    });
    return result.data;
};

const cache = flatCache.load("FKR");

export type fkrClientConfig = {
    clientId: string;
    accessKey: string;
    stsUrl: string;
    fhirUrl: string;
};

export const getCache = (): Cache => {
    return cache;
};
export const fkrGetToken = async (): Promise<string> => {
    const token = cache.getKey("token");
    if (token) {
        const nowTime = new Date().getTime() / 1000;
        try {
            const tokenContent = JWT.decode(token.access_token) as IdTokenClaims;
            if (nowTime < tokenContent.exp) {
                return token.access_token;
            }
        } catch (e) {
            console.error("fkrGetToken failed", e.message);
        }
    }
    const newToken = await getFreshToken();
    cache.setKey("token", newToken);
    cache.save();
    return newToken.access_token;
};
export type fkrGetPatientParams = {
    identifier?: string;
    name?: string;
};

async function fetchAndNext(writeStream, url, params, count): Promise<string | void> {
    const token = await fkrGetToken();
    const headers = { Authorization: `Bearer ${token}` };
    const result = await axios.get(url, {
        headers,
        params,
    });
    console.log(count, result.status, result.config.params.toString());
    result.data.entry.forEach((entry: IBundle_Entry) => {
        writeStream.write(JSON.stringify(entry.resource) + EOL);
    });
    let nextParams;
    result.data.link.forEach((link) => {
        if (link.relation === "next") {
            const url = new URL(link.url);
            nextParams = url.searchParams;
        }
    });
    if (nextParams && count < 100 && nextParams != params) {
        await fetchAndNext(writeStream, url, nextParams, count + 1);
    }

}

export async function fkrGetPatient(): Promise<string> {
    const config = getConfig();
    const url = config.fhirUrl + "/Patient";
    const writeStream = fs.createWriteStream("./tmp/patients.ndjson");
    await fetchAndNext(writeStream, url, {}, 1);
    return "done";
}

const getConfig = (): fkrClientConfig => {
    const envInst = env.from(process.env);
    return {
        stsUrl: envInst.get("FKR_STS_URL").required().asString(),
        fhirUrl: envInst.get("FKR_FHIR_URL").required().asString(),
        clientId: envInst.get("FKR_CLIENT_ID").required().asString(),
        accessKey: envInst.get("FKR_CLIENT_SECRET").required().asString(),
    };
};
