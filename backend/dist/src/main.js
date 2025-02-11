"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path = __importStar(require("path"));
const bodyParser = require('body-parser');
const app_module_1 = require("./modules/app/app.module");
const global_constants_1 = require("./shared/constants/global.constants");
const functions_1 = require("./shared/helpers/functions");
const coreConstant_1 = require("./shared/helpers/coreConstant");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, functions_1.setApp)(app);
    app.setGlobalPrefix(global_constants_1.API_PREFIX);
    app.use((0, cors_1.default)({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
    app.useStaticAssets(path.join(__dirname, `../../${coreConstant_1.coreConstant.FILE_DESTINATION}`), {
        prefix: `/${coreConstant_1.coreConstant.FILE_DESTINATION}`,
    });
    app.useStaticAssets(path.join(__dirname, `../../${coreConstant_1.coreConstant.FILE_DESTINATION}`), {
        prefix: `/${coreConstant_1.coreConstant.FILE_DESTINATION}`,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    await app.listen(process.env.APP_PORT || 3005);
}
bootstrap();
//# sourceMappingURL=main.js.map