import { LogService } from './log.service';
export declare class LoggerController {
    private readonly logService;
    constructor(logService: LogService);
    getLogFilesName(): Promise<import("../../shared/models/response.model").ResponseModel>;
    getDetailsOfLogg(payload: any): Promise<any>;
    deleteLoggFiles(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
}
