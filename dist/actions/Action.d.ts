import { PDFDocument } from 'pdf-lib';
/**
 * Represents a command that can be executed.
 * @class Action
 * @abstract
 */
export declare abstract class Action {
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
    protected createNewPdfDocument(): Promise<PDFDocument>;
    /**
     * Validates the existence of the PDF file.
     * @param {string} filePath - The path to the PDF file.
     * @throws {FileNotFoundError} Throws an error if the file is not found.
     * @private
     */
    protected validateFile(filePath: string): void;
    /**
     * Handles errors thrown during PDF joining.
     * @param error - The error object of type 'unknown'.
     * @returns void
     * @private
     */
    protected handleErrors(error: unknown): void;
}
