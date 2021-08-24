import {
    createLogger,
    LogContexts,
    logLevelNameFor,
    LogLevels,
} from 'bs-logger';

export const logger = createLogger({
    context: { namespace: 'http' },
    targets: 'stderr:' + LogLevels.info + '%json',
    // @ts-ignore
    translate: (msg) => {
        return {
            msg: msg.message,
            level: logLevelNameFor(msg.context[LogContexts.logLevel]),
            time: msg.time,
        };
    },
});

process.on('unhandledRejection', (error: Error) => {
    logger.error('Unhandled Rejection: ' + error.message, error);
});
