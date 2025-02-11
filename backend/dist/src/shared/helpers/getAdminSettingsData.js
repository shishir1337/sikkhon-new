"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminSettingsData = void 0;
const functions_1 = require("./functions");
async function getAdminSettingsData(slugs) {
    try {
        let data = {};
        if (Array.isArray(slugs)) {
            await Promise.all(slugs.map(async (slug) => {
                const slufInfo = await functions_1.PrismaClient.adminSettings.findFirst({
                    where: {
                        slug: slug,
                    },
                });
                if (slufInfo) {
                    data[slug] = slufInfo.value;
                }
                else {
                    data[slug] = null;
                }
            }));
        }
        else if (typeof slugs === 'string') {
            const slufInfo = await functions_1.PrismaClient.adminSettings.findFirst({
                where: {
                    slug: slugs,
                },
            });
            data[slugs] = slufInfo.value;
        }
        else {
            const slugInfoList = await functions_1.PrismaClient.adminSettings.findMany();
            slugInfoList.map((item) => {
                data[item.slug] = item.value;
            });
        }
        return data;
    }
    catch (error) {
        (0, functions_1.processException)(error);
    }
}
exports.getAdminSettingsData = getAdminSettingsData;
//# sourceMappingURL=getAdminSettingsData.js.map