import { Express } from "express";
import * as basicAuth from "express-basic-auth";
import * as env from "env-var";

export const configureAuth = (app: Express) => {
    const requiresAuth = env.get("REQUIRE_AUTH").default("true").asBool();
    if (requiresAuth) {
        const password = env.get("DUMB_PASSWORD").required().asString();
        app.use("/api/*",basicAuth({
            users: { "admin": password },
            challenge: true,
        }));
    }
};
