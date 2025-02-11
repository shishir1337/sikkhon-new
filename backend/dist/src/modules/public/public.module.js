"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const public_controller_1 = require("./public.controller");
const public_service_1 = require("./public.service");
const review_service_1 = require("../review/review.service");
let PublicModule = class PublicModule {
};
PublicModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [public_controller_1.PublicController],
        providers: [
            public_service_1.PublicService,
            review_service_1.ReviewService
        ],
        exports: [public_service_1.PublicService],
    })
], PublicModule);
exports.PublicModule = PublicModule;
//# sourceMappingURL=public.module.js.map