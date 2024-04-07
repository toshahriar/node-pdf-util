import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument } from 'pdf-lib';
import { Action } from './Action';

/**
 * Represents an action to split a PDF file into individual pages or by specified page length.
 * @class SplitPdfAction
 * @extends Action
 */
export class SplitPdfAction extends Action {
    /**
     * Creates an instance of SplitPdfAction.
     * @param {string | string[]} pdfFiles - The path(s) to the PDF file(s) to split. Can be a single string or an array of strings.
     * @param {string} outputPath - The directory where the individual pages will be saved.
     * @param {number} [pageLength=1] - The number of pages per split.
     */
    constructor(
        private pdfFiles: string | string[],
        private outputPath: string,
        private pageLength: number = 1
    ) {
        super();
    }

    /**
     * Executes the action to split the PDF file(s) into individual pages or by specified page length.
     * @returns {Promise<void>} A Promise that resolves when the PDF is successfully split.
     */
    async execute(): Promise<void> {
        // Convert pdfFiles to array if it's a string
        const pdfFiles: string[] =
            typeof this.pdfFiles === 'string' ? [this.pdfFiles] : this.pdfFiles;

        try {
            // Iterate through each PDF file
            for (const pdfFile of pdfFiles) {
                // Resolve the full path
                const resolvedPath: string = path.resolve(pdfFile);

                // Validate the existence of the PDF file
                this.validateFile(resolvedPath);

                // Split the PDF file
                await this.splitPdf(resolvedPath);
            }
        } catch (error: unknown) {
            // Handle errors
            this.handleErrors(error);
        }
    }

    /**
     * Splits the PDF file into individual pages or by specified page length.
     * @param {string} pdfFilePath - The path to the PDF file.
     * @returns {Promise<void>} A Promise that resolves when the PDF is successfully split.
     * @private
     */
    private async splitPdf(pdfFilePath: string): Promise<void> {
        // Create output directory if it doesn't exist
        if (!fs.existsSync(this.outputPath)) {
            fs.mkdirSync(this.outputPath, { recursive: true });
        }

        // Read the PDF file into a buffer
        const pdfBytes: Buffer = fs.readFileSync(pdfFilePath);

        // Load the PDF document
        const pdfDoc: PDFDocument = await PDFDocument.load(pdfBytes);

        // Get the total number of pages in the PDF
        const totalPages: number = pdfDoc.getPageCount();

        // Iterate through each page of the PDF
        for (
            let startPageIndex: number = 0;
            startPageIndex < totalPages;
            startPageIndex += this.pageLength
        ) {
            // Create a new PDF document for each split
            const newPdfDoc: PDFDocument = await this.createNewPdfDocument();

            // Copy pages from the original PDF document to the new one
            await this.copyPagesToNewPdf(
                pdfDoc,
                newPdfDoc,
                startPageIndex,
                totalPages
            );

            // Save the new PDF document containing the split pages
            await this.savePdfDocument(newPdfDoc, pdfFilePath, startPageIndex);
        }
    }

    /**
     * Copies pages from the source PDF document to the destination PDF document.
     * @param {PDFDocument} sourcePdf - The source PDF document.
     * @param {PDFDocument} destinationPdf - The destination PDF document.
     * @param {number} startPageIndex - The starting index of the page to copy.
     * @param {number} totalPages - The total number of pages in the source PDF document.
     * @returns {Promise<void>} A Promise that resolves when pages are copied.
     * @private
     */
    private async copyPagesToNewPdf(
        sourcePdf: PDFDocument,
        destinationPdf: PDFDocument,
        startPageIndex: number,
        totalPages: number
    ): Promise<void> {
        for (
            let pageIndexInSplit: number = startPageIndex;
            pageIndexInSplit < startPageIndex + this.pageLength &&
            pageIndexInSplit < totalPages;
            pageIndexInSplit++
        ) {
            const [copiedPage] = await destinationPdf.copyPages(sourcePdf, [
                pageIndexInSplit,
            ]);
            destinationPdf.addPage(copiedPage);
        }
    }

    /**
     * Saves the PDF document to a file.
     * @param {PDFDocument} pdfDoc - The PDF document to save.
     * @param {string} pdfFilePath - The path to the original PDF file.
     * @param {number} startPageIndex - The starting index of the page range.
     * @returns {Promise<void>} A Promise that resolves when the PDF document is saved.
     * @private
     */
    private async savePdfDocument(
        pdfDoc: PDFDocument,
        pdfFilePath: string,
        startPageIndex: number
    ): Promise<void> {
        const splitIndex: number =
            Math.floor(startPageIndex / this.pageLength) + 1;
        const outputPath: string = path.join(
            this.outputPath,
            `${path.basename(pdfFilePath, '.pdf')}_page_${splitIndex}.pdf`
        );
        const newPdfBytes: Uint8Array = await pdfDoc.save();
        fs.writeFileSync(outputPath, newPdfBytes);
        console.log(
            `Split ${splitIndex} of ${pdfFilePath} saved as ${outputPath}`
        );
    }
}
