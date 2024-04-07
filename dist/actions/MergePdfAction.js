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
exports.MergePdfAction = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pdf_lib_1 = require("pdf-lib");
const Action_1 = require("./Action");
const PdfProcessingError_1 = require("../exceptions/PdfProcessingError");
/**
 * Represents an action to merge multiple PDF files into a single PDF file.
 * @class MergePdfAction
 * @extends Action
 */
class MergePdfAction extends Action_1.Action {
    /**
     * Creates an instance of MergePdfAction.
     * @param {string | string[]} pdfFiles - The path(s) to the PDF file(s) to merge. Can be a single string or an array of strings.
     * @param {string} outputPath - The path where the merged PDF will be saved.
     */
    constructor(pdfFiles, outputPath) {
        super();
        this.pdfFiles = pdfFiles;
        this.outputPath = outputPath;
    }
    /**
     * Executes the action to merge multiple PDF files into a single PDF file.
     * @returns {Promise<void>} A Promise that resolves when the PDF files are successfully merged.
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Convert pdfFiles to array if it's a string
                const pdfFilePaths = typeof this.pdfFiles === 'string'
                    ? [this.pdfFiles]
                    : this.pdfFiles;
                // Create a new PDF document
                const pdfDoc = yield this.createNewPdfDocument();
                // Iterate through each PDF file path
                for (const pdfFile of pdfFilePaths) {
                    // Resolve the full path
                    const resolvedPath = path.resolve(pdfFile);
                    // Load and copy pages from the PDF file
                    yield this.copyPages(pdfDoc, resolvedPath);
                }
                // Save the merged PDF document
                yield this.savePdf(pdfDoc);
                // Log the success message
                console.log(`PDFs merged and saved as ${this.outputPath}`);
            }
            catch (error) {
                this.handleErrors(error);
            }
        });
    }
    /**
     * Copies pages from the source PDF document to the destination PDF document.
     * @param {PDFDocument} pdfDoc - The destination PDF document.
     * @param {string} pdfFile - The path to the source PDF file.
     * @returns {Promise<void>} A Promise that resolves when pages are copied.
     * @private
     */
    copyPages(pdfDoc, pdfFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Read the PDF file into a buffer
                const pdfBytes = fs.readFileSync(pdfFile);
                // Load the PDF document from the buffer
                const tempPdfDoc = yield pdf_lib_1.PDFDocument.load(pdfBytes);
                // Copy all pages from the temporary PDF document to the main PDF document
                const copiedPages = yield pdfDoc.copyPages(tempPdfDoc, tempPdfDoc.getPageIndices());
                copiedPages.forEach((page) => pdfDoc.addPage(page));
            }
            catch (error) {
                throw new PdfProcessingError_1.PdfProcessingError(`Failed to copy pages from ${pdfFile}: ${error.message}`);
            }
        });
    }
    /**
     * Saves the PDF document to a file.
     * @param {PDFDocument} pdfDoc - The PDF document to save.
     * @returns {Promise<void>} A Promise that resolves when the PDF document is saved.
     * @private
     */
    savePdf(pdfDoc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Save the merged PDF document to a Uint8Array
                const pdfBytes = yield pdfDoc.save();
                // Resolve the full path
                const resolvedPath = path.resolve(this.outputPath);
                // Write the Uint8Array to the output PDF file
                fs.writeFileSync(resolvedPath, pdfBytes);
            }
            catch (error) {
                throw new PdfProcessingError_1.PdfProcessingError(`Failed to save PDF document: ${error.message}`);
            }
        });
    }
}
exports.MergePdfAction = MergePdfAction;
//# sourceMappingURL=MergePdfAction.js.map