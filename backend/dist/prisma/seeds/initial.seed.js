"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialSeed = void 0;
const coreConstant_1 = require("../../src/shared/helpers/coreConstant");
const functions_1 = require("../../src/shared/helpers/functions");
async function initialSeed(prisma) {
    try {
        await prisma.user.createMany({
            data: [
                {
                    email: 'admin@sikkhon.com',
                    password: (await (0, functions_1.hashedPassword)(coreConstant_1.coreConstant.COMMON_PASSWORD)).toString(),
                    first_name: 'Mr',
                    last_name: 'Admin',
                    user_name: 'admin',
                    roles: `${coreConstant_1.coreConstant.ROLES.ADMIN},${coreConstant_1.coreConstant.ROLES.SUPER_ADMIN}`,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    email_verified: coreConstant_1.coreConstant.IS_VERIFIED,
                },
                {
                    email: 'student@sikkhon.com',
                    password: (await (0, functions_1.hashedPassword)(coreConstant_1.coreConstant.COMMON_PASSWORD)).toString(),
                    first_name: 'Mr',
                    last_name: 'Student',
                    user_name: 'student',
                    roles: `${coreConstant_1.coreConstant.ROLES.STUDENT}`,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    email_verified: coreConstant_1.coreConstant.IS_VERIFIED,
                },
                {
                    email: 'instructor@sikkhon.com',
                    password: (await (0, functions_1.hashedPassword)(coreConstant_1.coreConstant.COMMON_PASSWORD)).toString(),
                    first_name: 'Mr',
                    last_name: 'Instructor',
                    user_name: 'instructor',
                    roles: `${coreConstant_1.coreConstant.ROLES.INSTRUCTOR},${coreConstant_1.coreConstant.ROLES.STUDENT}`,
                    status: coreConstant_1.coreConstant.STATUS_ACTIVE,
                    email_verified: coreConstant_1.coreConstant.IS_VERIFIED,
                },
            ],
            skipDuplicates: true,
        });
    }
    catch (error) {
        console.error('Error seeding the database:', error);
        throw error;
    }
}
exports.initialSeed = initialSeed;
//# sourceMappingURL=initial.seed.js.map