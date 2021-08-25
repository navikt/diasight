import { Strategy } from "passport-linkedin-oauth2";
import { AuthPaths, LinkedInConfig } from "./configure-auth";

export async function linkedInStrategy(
    config: LinkedInConfig,
    paths: AuthPaths,
): Promise<Strategy> {
    return new Strategy({
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: paths.callbackUrl,
        scope: ["r_liteprofile", "r_emailaddress"],
    }, function(accessToken:string, refreshToken:string, profile, done) {
        return done(null, profile);
    });

}

