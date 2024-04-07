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
exports.Action = void 0;
const fs = __importStar(require("fs"));
const pdf_lib_1 = require("pdf-lib");
const FileNotFoundError_1 = require("../exceptions/FileNotFoundError");
const PdfProcessingError_1 = require("../exceptions/PdfProcessingError");
/**
 * Represents a command that can be executed.
 * @class Action
 * @abstract
 */
class Action {
    /**
     * Creates a new PDF document.
     * @returns {Promise<PDFDocument>} A Promise that resolves to a new PDF document.
     * @private
     */
    createNewPdfDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pdf_lib_1.PDFDocument.create();
        });
    }
    /**
     * Validates the existence of the PDF file.
     * @param {string} filePath - The path to the PDF file.
     * @throws {FileNotFoundError} Throws an error if the file is not found.
     * @private
     */
    validateFile(filePath) {
        if (!fs.existsSync(filePath)) {
            throw new FileNotFoundError_1.FileNotFoundError(`File not found: ${filePath}`);
        }
    }
    /**
     * Handles errors thrown during PDF joining.
     * @param error - The error object of type 'unknown'.
     * @returns void
     * @private
     */
    handleErrors(error) {
        if (error instanceof FileNotFoundError_1.FileNotFoundError ||
            error instanceof PdfProcessingError_1.PdfProcessingError) {
            console.error(error.message);
        }
        else {
            console.error('An unexpected error occurred:', error);
        }
    }
}
exports.Action = Action;
//# sourceMappingURL=Action.js.map