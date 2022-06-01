"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProvider = void 0;
const request_context_1 = __importDefault(require("request-context"));
class ContextProvider {
    static get(key) {
        return request_context_1.default.get(ContextProvider.getKeyWithNamespace(key));
    }
    static set(key, value) {
        request_context_1.default.set(ContextProvider.getKeyWithNamespace(key), value);
    }
    static getKeyWithNamespace(key) {
        return `${ContextProvider.nameSpace}.${key}`;
    }
    static setLanguage(language) {
        ContextProvider.set(ContextProvider.languageKey, language);
    }
    static getLanguage() {
        return ContextProvider.get(ContextProvider.languageKey);
    }
}
exports.ContextProvider = ContextProvider;
ContextProvider.nameSpace = 'request';
ContextProvider.authUserKey = 'user_key';
ContextProvider.languageKey = 'language_key';
//# sourceMappingURL=context.provider.js.map