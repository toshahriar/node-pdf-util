import { Action } from './Action';
/**
 * Represents an action to merge multiple PDF files into a single PDF file.
 * @class MergePdfAction
 * @extends Action
 */
export declare class MergePdfAction extends Action {
    private pdfFiles;
    private outputPath;
    /**
     * Creates an instance of MergePdfAction.
     * @param {string | string[]} pdfFiles - The path(s) to the PDF file(s) to merge. Can be a single string or an array of strings.
     * @param {string} outputPath - The path where the merged PDF will be saved.
     */
    constructor(pdfFiles: string | string[], outputPath: string);
    /**
     * Executes the action to merge multiple PDF files into a single PDF file.
     * @returns {Promise<void>} A Promise that resolves when the PDF files are successfully merged.
     */
    execute(): Promise<void>;
    /**
     * Copies pages from the source PDF document to the destination PDF document.
     * @param {PDFDocument} pdfDoc - The destination PDF document.
     * @param {string} pdfFile - The path to the source PDF file.
     * @returns {Promise<void>} A Promise that resolves when pages are copied.
     * @private
     */
    private copyPages;
    /**
     * Saves the PDF document to a file.
     * @param {PDFDocument} pdfDoc - The PDF document to save.
     * @returns {Promise<void>} A Promise that resolves when the PDF document is saved.
     * @private
     */
    private savePdf;
}
