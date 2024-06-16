"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizeArray = void 0;
function SanitizeArray(inputString) {
    let unsantiziedArray = inputString.split(',');
    let sanitizedArray = Array();
    for (const unsantizedString of unsantiziedArray) {
        sanitizedArray.push(unsantizedString.trim());
    }
    return sanitizedArray;
}
exports.SanitizeArray = SanitizeArray;
//# sourceMappingURL=index.js.map