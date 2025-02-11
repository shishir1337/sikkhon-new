"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const initial_seed_1 = require("./seeds/initial.seed");
const prisma = new client_1.PrismaClient({ log: ['query'] });
async function main() {
    await (0, initial_seed_1.initialSeed)(prisma);
}
main()
    .catch((e) => {
    console.error(e.stack);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map