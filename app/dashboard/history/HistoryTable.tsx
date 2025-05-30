"use client";

import React, { useState } from "react";

export interface HistoryItem {
  id: number;
  fromData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}

interface HistoryTableProps {
  history: HistoryItem[];
}

export default function HistoryTable({ history }: HistoryTableProps) {
  const [copySuccess, setCopySuccess] = useState<string>("");

  const handleCopy = async (text: string | null, index: number) => {
    if (!text) {
      setCopySuccess("Nothing to copy!");
      setTimeout(() => setCopySuccess(""), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`Copied output #${index + 1}!`);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch {
      setCopySuccess("Failed to copy!");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const totalWords = history.reduce(
    (acc, item) => acc + getWordCount(item.aiResponse || ""),
    0
  );

  return (
    <div className="space-y-4">
      {copySuccess && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
          {copySuccess}
        </div>
      )}

      {/* Responsive wrapper: horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left whitespace-nowrap">
                Template
              </th>
              <th className="border border-gray-300 p-2 text-left whitespace-nowrap">
                AI Response
              </th>
              <th className="border border-gray-300 p-2 text-left whitespace-nowrap">
                Date
              </th>
              <th className="border border-gray-300 p-2 text-left whitespace-nowrap">
                Words
              </th>
              <th className="border border-gray-300 p-2 text-left whitespace-nowrap">
                Copy
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white border-b hover:bg-gray-50 align-top"
              >
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {item.templateSlug || "N/A"}
                </td>
                <td className="border border-gray-300 p-2 whitespace-pre-wrap max-w-xs">
                  {item.aiResponse || "No response available"}
                </td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {item.createdAt || "Unknown"}
                </td>
                <td className="border border-gray-300 p-2 whitespace-nowrap">
                  {getWordCount(item.aiResponse || "")}
                </td>
                <td className="border border-gray-300 p-2 text-center whitespace-nowrap">
                  <button
                    onClick={() => handleCopy(item.aiResponse, index)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right font-semibold mt-2">
        Total Words: {totalWords}
      </div>
    </div>
  );
}
