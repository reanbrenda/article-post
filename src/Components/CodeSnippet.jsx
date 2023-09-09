import React, { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github-dark.css";
import clipboard from "clipboard";
import '../assets/styles/CodeSnippet.scss'

// Register the languages you want to support (e.g., JavaScript and XML)
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("xml", xml);

const CodeSnippet = ({ code, language }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    // Highlight the code when the component mounts
    hljs.highlightBlock(codeRef.current);

    // Create a new clipboard instance
    const clip = new clipboard(".btn-copy", {
      text: function () {
        return code;
      },
    });

    // Show a success message when code is copied
    clip.on("success", function (e) {
      e.trigger.innerHTML = "Copied!";
      setTimeout(() => {
        e.trigger.innerHTML = "Copy";
      }, 1000);
    });

    // Clean up the clipboard instance when the component unmounts
    return () => clip.destroy();
  }, [code, language]);

  return (
    <div className="code-snippet">
      <div className="code-header">
        <div className="language">{language}</div>
        <button className="btn-copy">Copy</button>
      </div>
      <pre>
        <code ref={codeRef} className={`hljs ${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
