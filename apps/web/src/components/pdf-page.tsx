"use client";

// import { Document, Page, pdfjs } from "react-pdf";

// export function PdfPage({ url, pageNumber = 1, width }: { url: string; pageNumber?: number; width?: number }) {
//   return (
//     <Document
//       file={url}
//       loading={<p>Loading PDF...</p>}
//       error={<p>Failed to load PDF</p>}
//     >
//       <Page pageNumber={pageNumber} width={width || 300} />
//     </Document>
//   );
// }

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export function PdfPage({url}: {url: string}) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className='w-full h-full'>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess} className="w-full flex flex-col items-center">
        {Array.from({length: numPages}, (_, index) => (
            <Page
                key={`page_${index+1}`}
                pageNumber={index+1}
                className=""
                renderAnnotationLayer={false}
                renderTextLayer={false}
            />
        ))}
        
      </Document>
    </div>
  );
}