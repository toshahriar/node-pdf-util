"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitPdfAction = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pdf_lib_1 = require("pdf-lib");
const Action_1 = require("./Action");
/**
 * Represents an action to split a PDF file into individual pages or by specified page length.
 * @class SplitPdfAction
 * @extends Action
 */
class SplitPdfAction extends Action_1.Action {
    /**
     * Creates an instance of SplitPdfAction.
     * @param {string | string[]} pdfFiles - The path(s) to the PDF file(s) to split. Can be a single string or an array of strings.
     * @param {string} outputPath - The directory where the individual pages will be saved.
     * @param {number} [pageLength=1] - The number of pages per split.
     */
    constructor(pdfFiles, outputPath, pageLength = 1) {
        super();
        this.pdfFiles = pdfFiles;
        this.outputPath = outputPath;
        this.pageLength = pageLength;
    }
    /**
     * Executes the action to split the PDF file(s) into individual pages or by specified page length.
     * @returns {Promise<void>} A Promise that resolves when the PDF is successfully split.
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // Convert pdfFiles to array if it's a string
            const pdfFiles = typeof this.pdfFiles === 'string' ? [this.pdfFiles] : this.pdfFiles;
            try {
                // Iterate through each PDF file
                for (const pdfFile of pdfFiles) {
                    // Resolve the full path
                    const resolvedPath = path.resolve(pdfFile);
                    // Validate the existence of the PDF file
                    this.validateFile(resolvedPath);
                    // Split the PDF file
                    yield this.splitPdf(resolvedPath);
                }
            }
            catch (error) {
                // Handle errors
                this.handleErrors(error);
            }
        });
    }
    /**
     * Splits the PDF file into individual pages or by specified page length.
     * @param {string} pdfFilePath - The path to the PDF file.
     * @returns {Promise<void>} A Promise that resolves when the PDF is successfully split.
     * @private
     */
    splitPdf(pdfFilePath) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create output directory if it doesn't exist
            if (!fs.existsSync(this.outputPath)) {
                fs.mkdirSync(this.outputPath, { recursive: true });
            }
            // Read the PDF file into a buffer
            const pdfBytes = fs.readFileSync(pdfFilePath);
            // Load the PDF document
            const pdfDoc = yield pdf_lib_1.PDFDocument.load(pdfBytes);
            // Get the total number of pages in the PDF
            const totalPages = pdfDoc.getPageCount();
            // Iterate through each page of the PDF
            for (let startPageIndex = 0; startPageIndex < totalPages; startPageIndex += this.pageLength) {
                // Create a new PDF document for each split
                const newPdfDoc = yield this.createNewPdfDocument();
                // Copy pages from the original PDF document to the new one
                yield this.copyPagesToNewPdf(pdfDoc, newPdfDoc, startPageIndex, totalPages);
                // Save the new PDF document containing the split pages
                yield this.savePdfDocument(newPdfDoc, pdfFilePath, startPageIndex);
            }
        });
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
    copyPagesToNewPdf(sourcePdf, destinationPdf, startPageIndex, totalPages) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let pageIndexInSplit = startPageIndex; pageIndexInSplit < startPageIndex + this.pageLength &&
                pageIndexInSplit < totalPages; pageIndexInSplit++) {
                const [copiedPage] = yield destinationPdf.copyPages(sourcePdf, [
                    pageIndexInSplit,
                ]);
                destinationPdf.addPage(copiedPage);
            }
        });
    }
    /**
     * Saves the PDF document to a file.
     * @param {PDFDocument} pdfDoc - The PDF document to save.
     * @param {string} pdfFilePath - The path to the original PDF file.
     * @param {number} startPageIndex - The starting index of the page range.
     * @returns {Promise<void>} A Promise that resolves when the PDF document is saved.
     * @private
     */
    savePdfDocument(pdfDoc, pdfFilePath, startPageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const splitIndex = Math.floor(startPageIndex / this.pageLength) + 1;
            const outputPath = path.join(this.outputPath, `${path.basename(pdfFilePath, '.pdf')}_page_${splitIndex}.pdf`);
            const newPdfBytes = yield pdfDoc.save();
            fs.writeFileSync(outputPath, newPdfBytes);
            console.log(`Split ${splitIndex} of ${pdfFilePath} saved as ${outputPath}`);
        });
    }
}
exports.SplitPdfAction = SplitPdfAction;
//# sourceMappingURL=SplitPdfAction.js.map