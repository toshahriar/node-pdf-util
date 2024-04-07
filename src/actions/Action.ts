import * as fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import { FileNotFoundError } from '../exceptions/FileNotFoundError';
import { PdfProcessingError } from '../exceptions/PdfProcessingError';

/**
 * Represents a command that can be executed.
 * @class Action
 * @abstract
 */
export abstract class Action {
    /**
     * Executes the command.
     * @returns A Promise that resolves when the command execution is complete.
     */
    abstract execute(): Promise<void>;

    /**
     * Creates a new PDF document.
     * @returns {Promise<PDFDocument>} A Promise that resolves to a new PDF document.
     * @private
     */
    protected async createNewPdfDocument(): Promise<PDFDocument> {
        return await PDFDocument.create();
    }

    /**
     * Validates the existence of the PDF file.
     * @param {string} filePath - The path to the PDF file.
     * @throws {FileNotFoundError} Throws an error if the file is not found.
     * @private
     */
    protected validateFile(filePath: string): void {
        if (!fs.existsSync(filePath)) {
            throw new FileNotFoundError(`File not found: ${filePath}`);
        }
    }

    /**
     * Handles errors thrown during PDF joining.
     * @param error - The error object of type 'unknown'.
     * @returns void
     * @private
     */
    protected handleErrors(error: unknown): void {
        if (
            error instanceof FileNotFoundError ||
            error instanceof PdfProcessingError
        ) {
            console.error((error as Error).message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}
