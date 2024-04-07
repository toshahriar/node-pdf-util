/**
 * Custom exception class for PDF processing errors.
 * @class PdfProcessingError
 * @extends Error
 */
export class PdfProcessingError extends Error {
    /**
     * Creates an instance of PdfProcessingError.
     * @param message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = 'PdfProcessingError';
    }
}
