import { PassportStatic, Strategy } from "passport";
import { Express } from "express";
import { AuthPaths } from "./configure-auth";
import { LinkedinUser } from "@diasight/linkedin";

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
    app.get("/auth/user", (req, res) => {
        const linkedinUser = req.user as LinkedinUser;
        res.send({
            isAuthenticated: req.isAuthenticated(),
            user: linkedinUser,
        });
    });
    app.get(urls.logoutUrl, (req, res) => {
        req.logOut();
        res.redirect(urls.unauthenticatedUrl);
    });
};
