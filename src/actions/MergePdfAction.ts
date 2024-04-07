import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument, PDFPage } from 'pdf-lib';
import { Action } from './Action';
import { PdfProcessingError } from '../exceptions/PdfProcessingError';

/**
 * Represents an action to merge multiple PDF files into a single PDF file.
 * @class MergePdfAction
 * @extends Action
 */
export class MergePdfAction extends Action {
    /**
     * Creates an instance of MergePdfAction.
     * @param {string | string[]} pdfFiles - The path(s) to the PDF file(s) to merge. Can be a single string or an array of strings.
     * @param {string} outputPath - The path where the merged PDF will be saved.
     */
    constructor(
        private pdfFiles: string | string[],
        private outputPath: string
    ) {
        super();
    }

    /**
     * Executes the action to merge multiple PDF files into a single PDF file.
     * @returns {Promise<void>} A Promise that resolves when the PDF files are successfully merged.
     */
    async execute(): Promise<void> {
        try {
            // Convert pdfFiles to array if it's a string
            const pdfFilePaths: string[] =
                typeof this.pdfFiles === 'string'
                    ? [this.pdfFiles]
                    : this.pdfFiles;

            // Create a new PDF document
            const pdfDoc: PDFDocument = await this.createNewPdfDocument();

            // Iterate through each PDF file path
            for (const pdfFile of pdfFilePaths) {
                // Resolve the full path
                const resolvedPath: string = path.resolve(pdfFile);

                // Load and copy pages from the PDF file
                await this.copyPages(pdfDoc, resolvedPath);
            }

            // Save the merged PDF document
            await this.savePdf(pdfDoc);

            // Log the success message
            console.log(`PDFs merged and saved as ${this.outputPath}`);
        } catch (error: unknown) {
            this.handleErrors(error);
        }
    }

    /**
     * Copies pages from the source PDF document to the destination PDF document.
     * @param {PDFDocument} pdfDoc - The destination PDF document.
     * @param {string} pdfFile - The path to the source PDF file.
     * @returns {Promise<void>} A Promise that resolves when pages are copied.
     * @private
     */
    private async copyPages(
        pdfDoc: PDFDocument,
        pdfFile: string
    ): Promise<void> {
        try {
            // Read the PDF file into a buffer
            const pdfBytes: Buffer = fs.readFileSync(pdfFile);

            // Load the PDF document from the buffer
            const tempPdfDoc: PDFDocument = await PDFDocument.load(pdfBytes);

            // Copy all pages from the temporary PDF document to the main PDF document
            const copiedPages: PDFPage[] = await pdfDoc.copyPages(
                tempPdfDoc,
                tempPdfDoc.getPageIndices()
            );
            copiedPages.forEach((page: PDFPage) => pdfDoc.addPage(page));
        } catch (error: unknown) {
            throw new PdfProcessingError(
                `Failed to copy pages from ${pdfFile}: ${(error as Error).message}`
            );
        }
    }

    /**
     * Saves the PDF document to a file.
     * @param {PDFDocument} pdfDoc - The PDF document to save.
     * @returns {Promise<void>} A Promise that resolves when the PDF document is saved.
     * @private
     */
    private async savePdf(pdfDoc: PDFDocument): Promise<void> {
        try {
            // Save the merged PDF document to a Uint8Array
            const pdfBytes: Uint8Array = await pdfDoc.save();

            // Resolve the full path
            const resolvedPath: string = path.resolve(this.outputPath);

            // Write the Uint8Array to the output PDF file
            fs.writeFileSync(resolvedPath, pdfBytes);
        } catch (error: unknown) {
            throw new PdfProcessingError(
                `Failed to save PDF document: ${(error as Error).message}`
            );
        }
    }
}
