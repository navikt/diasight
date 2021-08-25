import { Express } from "express";
import * as passport from "passport";
import { createAuthEndpoints } from "./create-auth-endpoints";
import { linkedInStrategy } from "./linkedin-strategy";
import * as env from "env-var";

export type LinkedInConfig = {
    clientId: string;
    clientSecret: string;
};

export interface AuthStateResponse {
    isAuthenticated: boolean,
    loginUrl?: string,
    logoutUrl?: string,
}

export type AuthPaths = {
    loginUrl: string;
    callbackUrl: string;
    errorUrl: string;
    logoutUrl: string;
    indexUrl: string;
    unauthenticatedUrl: string;
};

export const configureAuthentication = async (
    app: Express,
    paths: AuthPaths,
): Promise<void> => {
    const config: LinkedInConfig = {
        clientId: env.get("LINKEDIN_CLIENT_ID").required().asString(),
        clientSecret: env.get("LINKEDIN_CLIENT_SECRET").required().asString(),
    };
    app.use(passport.initialize());
    app.use(passport.session());
    const strategy = await linkedInStrategy(config, paths);
    passport.use(strategy.name, strategy);
    passport.serializeUser((user: Express.User, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user as Express.User);
    });
    createAuthEndpoints(app, passport, strategy, paths);

};
