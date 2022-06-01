"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NhaXeDTO = void 0;
const openapi = require("@nestjs/swagger");
class NhaXeDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { barcode: { required: true, type: () => String }, plateNumber: { required: true, type: () => String } };
    }
}
exports.NhaXeDTO = NhaXeDTO;
//# sourceMappingURL=nhaxe.dto.js.map