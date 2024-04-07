/**
 * Represents a base class for actions.
 * @class Action
 */
export { Action } from './actions/Action';

/**
 * Represents an error thrown when a file is not found.
 * @class FileNotFoundError
 */
export { FileNotFoundError } from './exceptions/FileNotFoundError';

/**
 * Represents an error thrown during PDF processing.
 * @class PdfProcessingError
 */
export { PdfProcessingError } from './exceptions/PdfProcessingError';

/**
 * Represents an action to merge multiple PDF files into a single PDF file.
 * @class MergePdfAction
 */
export { MergePdfAction } from './actions/MergePdfAction';

/**
 * Represents an action to split PDF file(s) into several files.
 * @class SplitPdfAction
 */
export { SplitPdfAction } from './actions/SplitPdfAction';
