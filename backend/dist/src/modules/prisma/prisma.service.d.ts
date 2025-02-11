import { INestApplication, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare const exclude: <M extends string | number | symbol, P extends import("prisma-exclude/dist/types").GetModelProps<any, M>, O extends (keyof P)[]>(model: M, omit: O) => { [Key in Exclude<keyof P, O[number]>]: true; };
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleDestroy(): Promise<void>;
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
