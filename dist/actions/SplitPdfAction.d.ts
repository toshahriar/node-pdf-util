import { Action } from './Action';
/**
 * Represents an action to split a PDF file into individual pages or by specified page length.
 * @class SplitPdfAction
 * @extends Action
 */
export declare class SplitPdfAction extends Action {
    private pdfFiles;
    private outputPath;
    private pageLength;
    /**
     * Creates an instance of SplitPdfAction.
     * @param {string | string[]} pdfFiles - The path(s) to the PDF file(s) to split. Can be a single string or an array of strings.
     * @param {string} outputPath - The directory where the individual pages will be saved.
     * @param {number} [pageLength=1] - The number of pages per split.
     */
    constructor(pdfFiles: string | string[], outputPath: string, pageLength?: number);
    /**
     * Executes the action to split the PDF file(s) into individual pages or by specified page length.
     * @returns {Promise<void>} A Promise that resolves when the PDF is successfully split.
     */
    execute(): Promise<void>;
    /**
     * Splits the PDF file into individual pages or by specified page length.
     * @param {string} pdfFilePath - The path to the PDF file.
     * @returns {Promise<void>} A Promise that resolves when the PDF is successfully split.
     * @private
     */
    private splitPdf;
    /**
     * Copies pages from the source PDF document to the destination PDF document.
     * @param {PDFDocument} sourcePdf - The source PDF document.
     * @param {PDFDocument} destinationPdf - The destination PDF document.
     * @param {number} startPageIndex - The starting index of the page to copy.
     * @param {number} totalPages - The total number of pages in the source PDF document.
     * @returns {Promise<void>} A Promise that resolves when pages are copied.
     * @private
     */
    private copyPagesToNewPdf;
    /**
     * Saves the PDF document to a file.
     * @param {PDFDocument} pdfDoc - The PDF document to save.
     * @param {string} pdfFilePath - The path to the original PDF file.
     * @param {number} startPageIndex - The starting index of the page range.
     * @returns {Promise<void>} A Promise that resolves when the PDF document is saved.
     * @private
     */
    private savePdfDocument;
}
