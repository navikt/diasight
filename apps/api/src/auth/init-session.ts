import * as session from "express-session";
import { MemoryStore, Store } from "express-session";
import * as cookieParser from "cookie-parser";
import * as env from "env-var";
import { Express } from "express";
import * as connectRedis from "connect-redis";
import * as redis from "redis";
import { logger } from "../utils/logger";

const RedisStore = connectRedis(session);

function getSessionStore(forceRedis: boolean): Store {
    const redisConfig: { host: string } = {
        host: env.get("REDIS_HOST").required().asString(),
    };
    if (isOnNais() || forceRedis) {
        logger.info("Using Redis session store at " + redisConfig.host + ".");

        const redisClient = redis.createClient(redisConfig);
        return new RedisStore({
            client: redisClient,
            ttl: 43200,
        });
    } else {
        logger.info("Using memory session store.");
        return new MemoryStore();
    }
}

export const isOnNais = (): boolean => {
    return !!(process.env.NAIS_APP_NAME &&
        process.env.NAIS_NAMESPACE &&
        process.env.NAIS_APP_IMAGE);
};


export const initSession = (app: Express, forceRedis?: boolean) => {
    app.set("trust proxy", 1);
    app.use(cookieParser());
    app.use(
        session({
            store: getSessionStore(forceRedis),
            name: "helseopplysninger",
            resave: false,
            saveUninitialized: false,
            secret: "sdafasdfasd",
            cookie: {
                httpOnly: true,
                secure: isOnNais(),
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: "lax",
            },
        }),
    );
};
