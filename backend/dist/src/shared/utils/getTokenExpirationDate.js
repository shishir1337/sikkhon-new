"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenExpirationDate = void 0;
function getTokenExpirationDate() {
    const expiresInDays = 7;
    const expiresAt = addDaysFromNow(expiresInDays);
    return expiresAt;
}
exports.getTokenExpirationDate = getTokenExpirationDate;
function addDaysFromNow(days) {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}
//# sourceMappingURL=getTokenExpirationDate.js.map