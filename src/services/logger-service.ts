import { Service } from 'typedi';
import { Logger } from '../utils/logger';

@Service('logger.service')
export class LoggerService {

    private map: Map<string, Logger> = new Map<string, Logger>();

    public createLogger(tag: string): Logger {
        if (this.map.has(tag)) {
            return this.map.get(tag);
        }
        const logger: Logger = new Logger(tag);
        this.map.set(tag, logger);
        return logger;
    }

}
