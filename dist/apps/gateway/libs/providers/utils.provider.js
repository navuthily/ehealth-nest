"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsProvider = void 0;
class UtilsProvider {
    static generateHash(password) {
        return password;
    }
    static generateRandomString(length) {
        return Math.random()
            .toString(36)
            .replace(/[^\dA-Za-z]+/g, '')
            .slice(0, Math.max(0, length));
    }
    static validateHash(password, hash) {
        if (!password || !hash) {
            return Promise.resolve(false);
        }
        if (password !== hash) {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
}
exports.UtilsProvider = UtilsProvider;
//# sourceMappingURL=utils.provider.js.map