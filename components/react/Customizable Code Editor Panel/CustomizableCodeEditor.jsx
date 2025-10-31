import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

// Import Codemirror themes and modes
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";

// Component
const CustomizableCodeEditor = () => {
  const [code, setCode] = useState(
    `<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 { color: #4F46E5; font-family: sans-serif; }
    </style>
  </head>
  <body>
    <h1>Hello World 🌍</h1>
  </body>
</html>`
  );
  const [theme, setTheme] = useState("dracula");
  const [language, setLanguage] = useState("xml");
  const [showPreview, setShowPreview] = useState(true);

  const themes = ["dracula", "eclipse", "material", "monokai"];
  const languages = [
    { name: "HTML", mode: "xml" },
    { name: "CSS", mode: "css" },
    { name: "JavaScript", mode: "javascript" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🧩 Customizable Code Editor Panel
      </h1>

      <div className="flex gap-3 mb-4">
        {/* Theme Selector */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border rounded-md px-3 py-1 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500"
        >
          {themes.map((th) => (
            <option key={th} value={th}>
              {th.charAt(0).toUpperCase() + th.slice(1)}
            </option>
          ))}
        </select>

        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded-md px-3 py-1 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-500"
        >
          {languages.map((lang) => (
            <option key={lang.mode} value={lang.mode}>
              {lang.name}
            </option>
          ))}
        </select>

        {/* Toggle Preview */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6">
        {/* Code Editor Panel */}
        <div className="flex-1 border rounded-lg shadow-md overflow-hidden">
          <CodeMirror
            value={code}
            options={{
              mode: language,
              theme: theme,
              lineNumbers: true,
              lineWrapping: true,
              smartIndent: true,
              matchBrackets: true,
            }}
            onBeforeChange={(editor, data, value) => {
              setCode(value);
            }}
            className="h-[500px]"
          />
        </div>

        {/* Live Preview Panel */}
        {showPreview && (
          <div className="flex-1 border rounded-lg shadow-md bg-white overflow-hidden">
            <iframe
              title="Live Preview"
              srcDoc={code}
              className="w-full h-[500px]"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizableCodeEditor;
