import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioConfig {
  private readonly minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT || '',
      port: Number(process.env.MINIO_PORT || 443),
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY || '',
      secretKey: process.env.MINIO_SECRET_KEY || '',
    });
  }

  getClient(): Client {
    return this.minioClient;
  }
}
