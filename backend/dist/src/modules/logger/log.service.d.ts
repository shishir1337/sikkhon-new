export declare class LogService {
    private logDirectory;
    constructor();
    getLogFilesName(): Promise<import("../../shared/models/response.model").ResponseModel>;
    getLogFromAllFiles(payload?: any): Promise<any>;
    private readAllLogFiles;
    private readAllLogFile;
    deleteLoggFiles(payload: any): Promise<import("../../shared/models/response.model").ResponseModel>;
    private deleteAllLogFiles;
    private deleteLogFile;
}
