/**
 * Custom exception class for file not found error.
 * @class FileNotFoundException
 * @extends Error
 */
export class FileNotFoundError extends Error {
    /**
     * Creates an instance of FileNotFoundError.
     * @param message - The error message.
     */
    constructor(message: string) {
        super(message);
        this.name = 'FileNotFoundError';
    }
}
