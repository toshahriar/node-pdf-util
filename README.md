# Node PDF Util

Node PDF Util is a package that provides utilities for working with PDF files in Node.js applications. It includes
commands for splitting, merging and converting PDF files.

## Installation

You can install Node PDF Util via npm:

```bash
npm install node-pdf-util
```

### Merge PDF files

#### JavaScript

```javascript
const { MergePdfAction } = require('node-pdf-util');

// Example usage
const pdfFiles = ['path/to/file1.pdf', 'path/to/file2.pdf']; // Array of PDF files to merge
const outputPath = 'path/to/merged.pdf'; // Output path for the merged PDF
const mergeAction = new MergePdfAction(pdfFiles, outputPath);

// Execute merge action
mergeAction.execute()
    .then(() => console.log('PDFs merged successfully'))
    .catch(error => console.error('Error while merging PDFs:', error));
```

#### TypeScript

```typescript
import { MergePdfAction } from 'node-pdf-util';

// Example usage
const pdfFiles: string[] = ['path/to/file1.pdf', 'path/to/file2.pdf']; // Array of PDF files to merge
const outputPath: string = 'path/to/merged.pdf'; // Output path for the merged PDF
const mergeAction: MergePdfAction = new MergePdfAction(pdfFiles, outputPath);

// Execute merge action
mergeAction.execute()
    .then(() => console.log('PDFs merged successfully'))
    .catch(error => console.error('Error while merging PDFs:', error));
```
### Split PDF files

#### JavaScript

```javascript
const { SplitPdfAction } = require('node-pdf-util');

// Example usage
const pdfFiles = ['path/to/file1.pdf', 'path/to/file2.pdf']; // Array of PDF files to split
const outputPath = 'path/to/output_directory'; // Output directory for the split PDF pages
const pageLength = 1; // Number of pages per split (optional, default is 1)
const splitAction = new SplitPdfAction(pdfFiles, outputPath, pageLength);

// Execute split action
splitAction.execute()
  .then(() => console.log('PDFs split successfully'))
  .catch(error => console.error('Error while splitting PDFs:', error));
```

#### TypeScript

```typescript
import { SplitPdfAction } from 'node-pdf-util';

// Example usage
const pdfFiles: string[] = ['path/to/file1.pdf', 'path/to/file2.pdf']; // Array of PDF files to split
const outputPath: string = 'path/to/output_directory'; // Output directory for the split PDF pages
const pageLength: number = 1; // Number of pages per split (optional, default is 1)
const splitAction: SplitPdfAction = new SplitPdfAction(pdfFiles, outputPath, pageLength);

// Execute split action
splitAction.execute()
  .then(() => console.log('PDFs split successfully'))
  .catch(error => console.error('Error while splitting PDFs:', error));
```

#### API Specification

##### `MergePdfAction`
Represents an action to merge multiple PDF files into a single PDF file.

- **Constructor:**
    - `new MergePdfAction(pdfFiles: string | string[], outputPath: string)`
        - `pdfFiles`: The path(s) to the PDF file(s) to merge. Can be a single string or an array of strings.
        - `outputPath`: The path where the merged PDF will be saved.
- **Methods:**
    - `execute(): Promise<void>`
        - Executes the action to merge multiple PDF files into a single PDF file.
        - Returns: `Promise<void>` - A Promise that resolves when the PDF files are successfully merged.

##### `SplitPdfAction`
Represents an action to split a PDF file into individual pages or by specified page length.

- **Constructor:**
    - `new SplitPdfAction(pdfFiles: string | string[], outputPath: string, pageLength: number = 1)`
        - `pdfFiles`: The path(s) to the PDF file(s) to split. Can be a single string or an array of strings.
        - `outputPath`: The directory where the individual pages will be saved.
        - `pageLength`: (Optional) The number of pages per split. Default is 1.
- **Methods:**
    - `execute(): Promise<void>`
        - Executes the action to split the PDF file(s) into individual pages or by specified page length.
        - Returns: `Promise<void>` - A Promise that resolves when the PDF is successfully split.