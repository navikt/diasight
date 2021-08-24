import { Strategy } from "passport-linkedin-oauth2";
import { AuthPaths, LinkedInConfig } from "./configure-auth";

export async function linkedInStrategy(
    config: LinkedInConfig,
    paths: AuthPaths,
): Strategy {
    return new Strategy({
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: paths.callbackUrl,
        scope: ["r_liteprofile", "r_emailaddress"],
        state: true,
    }, function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    });

}

