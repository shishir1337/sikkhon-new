"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const admin_live_class_controller_1 = require("./admin/admin-live-class.controller");
const class_service_1 = require("./class.service");
const liveclass_controller_1 = require("./instructor/liveclass.controller");
const live_class_service_1 = require("./live-class.service");
const user_live_class_controller_1 = require("./user/user-live-class.controller");
let ClassModule = class ClassModule {
};
ClassModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            admin_live_class_controller_1.AdminLiveClassController,
            liveclass_controller_1.LiveClassInstructorController,
            user_live_class_controller_1.LiveClassStudentController,
        ],
        providers: [class_service_1.AgoraTokenService, live_class_service_1.LiveClassService],
        imports: [prisma_module_1.PrismaModule],
    })
], ClassModule);
exports.ClassModule = ClassModule;
//# sourceMappingURL=class.module.js.map