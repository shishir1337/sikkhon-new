"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = exports.exclude = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_exclude_1 = require("prisma-exclude");
exports.exclude = (0, prisma_exclude_1.prismaExclude)(new client_1.PrismaClient());
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'error' },
                { emit: 'event', level: 'warn' },
            ],
        });
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async onModuleInit() {
        await this.$connect();
        this.$on('error', (e) => {
            console.log('Prisma-Error: ' + JSON.stringify(e), 'error');
        });
        this.$on('warn', (e) => {
            console.log('Prisma-Warn: ' + e.message, 'warn');
        });
        if (process.env.QUERY_DEBUG === 'true') {
            this.$on('query', (e) => {
                console.log('\nQuery: ' + e.query);
                console.log('Params: ' + e.params);
                console.log('Duration: ' + e.duration + 'ms\n');
            });
        }
    }
    async enableShutdownHooks(app) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
};
PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
exports.PrismaService = PrismaService;
//# sourceMappingURL=prisma.service.js.map