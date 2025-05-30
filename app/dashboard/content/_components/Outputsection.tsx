"use client";

import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import type { Editor as ToastEditor } from "@toast-ui/react-editor";

// Dynamically import the Toast UI Editor with SSR disabled
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  { ssr: false }
);

interface Props {
  aiOutput: string;
}

function Outputsection({ aiOutput }: Props) {
  const editorRef = useRef<ToastEditor | null>(null); // ✅ Typed and initialized

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(aiOutput);
    }
  }, [aiOutput]);

  return (
    <div className="bg-white shadow-lg border rounded-lg mx-2 sm:mx-auto max-w-screen-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 gap-3">
        <h2 className="font-medium text-lg sm:text-xl">Your Result</h2>
        <Button
          className="flex gap-2 cursor-pointer whitespace-nowrap"
          onClick={() => navigator.clipboard.writeText(aiOutput)}
        >
          <Copy />
          Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your Result will appear here"
        initialEditType="wysiwyg"
        height={window.innerWidth < 640 ? "300px" : "600px"} // dynamic height based on screen width
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current?.getInstance().getMarkdown())
        }
      />
    </div>
  );
}

export default Outputsection;
