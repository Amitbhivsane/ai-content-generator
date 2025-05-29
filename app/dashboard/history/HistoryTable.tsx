"use client";

import React, { useState } from "react";

export interface HistoryItem {
  id: Number;
  formData: string;
  templateSlug: string;
  aiResponse: string;
  createdAt: string;
  createdBy: string;
}

interface HistoryTableProps {
  history: HistoryItem[];
}

export default function HistoryTable({ history }: HistoryTableProps) {
  const [copySuccess, setCopySuccess] = useState<string>("");

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`Copied output #${index + 1}!`);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch {
      setCopySuccess("Failed to copy!");
    }
  };

  // Utility to count words
  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const totalWords = history.reduce(
    (acc, item) => acc + getWordCount(item.aiResponse),
    0
  );

  return (
    <div className="space-y-4">
      {copySuccess && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
          {copySuccess}
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2 text-left">Template</th>
            <th className="border border-gray-300 p-2 text-left">
              AI Response
            </th>
            <th className="border border-gray-300 p-2 text-left">Date</th>
            <th className="border border-gray-300 p-2 text-left">Words</th>
            <th className="border border-gray-300 p-2 text-left">Copy</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="border border-gray-300 p-2">
                {item.templateSlug || "N/A"}
              </td>
              <td className="border border-gray-300 p-2 whitespace-pre-wrap max-w-xl">
                {item.aiResponse}
              </td>
              <td className="border border-gray-300 p-2">{item.createdAt}</td>
              <td className="border border-gray-300 p-2">
                {getWordCount(item.aiResponse)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
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

      <div className="text-right font-semibold mt-2">
        {/* Total Words: {totalWords} */}
      </div>
    </div>
  );
}
