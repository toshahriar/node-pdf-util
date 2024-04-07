"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfProcessingError = void 0;
/**
 * Custom exception class for PDF processing errors.
 * @class PdfProcessingError
 * @extends Error
 */
class PdfProcessingError extends Error {
    /**
     * Creates an instance of PdfProcessingError.
     * @param message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'PdfProcessingError';
    }
}
exports.PdfProcessingError = PdfProcessingError;
//# sourceMappingURL=PdfProcessingError.js.map