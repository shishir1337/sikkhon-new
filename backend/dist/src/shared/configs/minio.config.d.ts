import { Client } from 'minio';
export declare class MinioConfig {
    private readonly minioClient;
    constructor();
    getClient(): Client;
}
