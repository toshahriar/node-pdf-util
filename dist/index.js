"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitPdfAction = exports.MergePdfAction = exports.PdfProcessingError = exports.FileNotFoundError = exports.Action = void 0;
/**
 * Represents a base class for actions.
 * @class Action
 */
var Action_1 = require("./actions/Action");
Object.defineProperty(exports, "Action", { enumerable: true, get: function () { return Action_1.Action; } });
/**
 * Represents an error thrown when a file is not found.
 * @class FileNotFoundError
 */
var FileNotFoundError_1 = require("./exceptions/FileNotFoundError");
Object.defineProperty(exports, "FileNotFoundError", { enumerable: true, get: function () { return FileNotFoundError_1.FileNotFoundError; } });
/**
 * Represents an error thrown during PDF processing.
 * @class PdfProcessingError
 */
var PdfProcessingError_1 = require("./exceptions/PdfProcessingError");
Object.defineProperty(exports, "PdfProcessingError", { enumerable: true, get: function () { return PdfProcessingError_1.PdfProcessingError; } });
/**
 * Represents an action to merge multiple PDF files into a single PDF file.
 * @class MergePdfAction
 */
var MergePdfAction_1 = require("./actions/MergePdfAction");
Object.defineProperty(exports, "MergePdfAction", { enumerable: true, get: function () { return MergePdfAction_1.MergePdfAction; } });
/**
 * Represents an action to split PDF file(s) into several files.
 * @class SplitPdfAction
 */
var SplitPdfAction_1 = require("./actions/SplitPdfAction");
Object.defineProperty(exports, "SplitPdfAction", { enumerable: true, get: function () { return SplitPdfAction_1.SplitPdfAction; } });
//# sourceMappingURL=index.js.map