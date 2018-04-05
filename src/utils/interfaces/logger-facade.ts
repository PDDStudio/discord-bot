export interface LoggerFacade {
    warn(message?: any, ...params: any[]);
    info(message?: any, ...params: any[]);
    error(message?: any, ...params: any[]);
    debug(message?: any, ...params: any[]);
    log(message?: any, ...params: any[]);
}
