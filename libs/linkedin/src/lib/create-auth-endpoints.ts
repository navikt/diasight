import { PassportStatic } from "passport";
import { Express, Request } from "express";
import { AuthPaths, AuthStateResponse } from "./configure-auth";
import { LinkedinUser } from "@diasight/linkedin";
import { Strategy } from "passport-linkedin-oauth2";


export function fullUrl(req: Request, path: string) {
    return req.protocol + "://" + req.get("host") + path;
}


export const createAuthEndpoints = (
    app: Express,
    passport: PassportStatic,
    strategy: Strategy,
    urls: AuthPaths,
) => {
    app.get(
        urls.loginUrl,
        passport.authenticate(strategy.name),
    );
    app.get(
        urls.callbackUrl,
        passport.authenticate(strategy.name, {
            failureRedirect: urls.errorUrl,
        }),
        (req: any, res) => {
            if (req.session.redirectTo) {
                res.redirect(req.session.redirectTo);
            } else {
                res.redirect(urls.indexUrl);
            }
        },
    );
    app.get("/auth/state", (req, res) => {
        const data: AuthStateResponse = {
            isAuthenticated: req.isAuthenticated(),
            loginUrl: fullUrl(req, urls.loginUrl),
            logoutUrl: fullUrl(req, urls.logoutUrl),
        };
        res.send(data);
    });
    app.get("/auth/provider-user", (req, res) => {
        const linkedinUser = req.user as LinkedinUser;
        res.send(linkedinUser);
    });
    app.get(urls.logoutUrl, (req, res) => {
        req.logOut();
        res.redirect(urls.unauthenticatedUrl);
    });
};
