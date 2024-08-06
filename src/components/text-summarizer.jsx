import React, { useState, useEffect } from "react";
import { HfInference } from "@huggingface/inference";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { Textarea } from "./ui/textarea";

const HUGGINGFACE_KEY = import.meta.env.VITE_HUGGINGFACE_KEY;

const TextSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputWordCount, setInputWordCount] = useState(0);
  const [summaryWordCount, setSummaryWordCount] = useState(0);

  const hf = new HfInference(HUGGINGFACE_KEY);

  const countWords = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  useEffect(() => {
    setInputWordCount(countWords(inputText));
  }, [inputText]);

  useEffect(() => {
    setSummaryWordCount(countWords(summary));
  }, [summary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await hf.summarization({
        model: "gaduhhartawan/bart-indo-small",
        inputs: inputText,
      });
      setSummary(result.summary_text);
    } catch (error) {
      console.error("Error:", error);
      setSummary("Terjadi kesalahan server. Coba beberapa saat lagi.");
    }

    setIsLoading(false);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[400px] max-w-4xl rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col p-6">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="To summarize text, enter or paste text here and press 'Summarize'."
              className={`flex-grow p-2 mb-4 border rounded`}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText}
              className="px-4 py-2 bg-black-90 text-white rounded hover:bg-black-100 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Summarizing..." : "Summarize"}
            </button>
          </form>
          <div className="mt-2 text-sm text-gray-500">
            Word count: {inputWordCount}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col p-6">
          <div className="flex-grow p-2 border rounded overflow-auto mb-4">
            {summary ? summary : "Your summary will appear here."}
          </div>
          <button
            type="submit"
            disabled={!summary}
            className="px-4 py-2 bg-black-90 text-white rounded hover:bg-black-100 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => {
              setSummary("");
              setInputText("");
            }}
          >
            Clear Summary
          </button>
          <div className="mt-2 text-sm text-gray-500">
            Word count: {summaryWordCount}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default TextSummarizer;
