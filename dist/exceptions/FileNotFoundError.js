"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotFoundError = void 0;
/**
 * Custom exception class for file not found error.
 * @class FileNotFoundException
 * @extends Error
 */
class FileNotFoundError extends Error {
    /**
     * Creates an instance of FileNotFoundError.
     * @param message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'FileNotFoundError';
    }
}
exports.FileNotFoundError = FileNotFoundError;
//# sourceMappingURL=FileNotFoundError.js.map