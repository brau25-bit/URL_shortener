import { Logger } from '../../domain/logger/logger.js';

import pino from 'pino';

export class PinoLogger implements Logger{
    private readonly logger = pino({
        timestamp: pino.stdTimeFunctions.isoTime
    });

    info(message: string, meta?: object): void {
        this.logger.info(meta, message);
    }

    warn(message: string, meta?: object): void {
        this.logger.warn(meta, message);
    }

    error(message: string, meta?: object): void {
        this.logger.error(meta, message);
    }
}