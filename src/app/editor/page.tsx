"use client";

import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export default function EditorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [instructions, setInstructions] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreviewURL(URL.createObjectURL(selected));
  };

  const handlePDFLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold">Resume Editor</h1>

        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {file && previewURL && isClient && (
          <div className="border rounded p-4">
            <h2 className="text-lg font-semibold mb-2">Preview:</h2>
            {file.type === "application/pdf" ? (
              <Document file={previewURL} onLoadSuccess={handlePDFLoadSuccess}>
                {Array.from(new Array(numPages), (_, i) => (
                  <Page key={i} pageNumber={i + 1} />
                ))}
              </Document>
            ) : file.type.startsWith("image/") ? (
              <img
                src={previewURL}
                alt="Uploaded"
                className="max-w-full h-auto border rounded"
              />
            ) : (
              <p className="text-gray-500">Preview not available for DOC/DOCX yet.</p>
            )}
          </div>
        )}

        <textarea
          className="w-full border rounded p-3 min-h-[150px]"
          placeholder="Describe the edits you want to make to your resume..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          onClick={() => alert("Submit functionality will be added soon.")}
        >
          Submit for Editing
        </button>
      </div>
    </div>
  );
}
