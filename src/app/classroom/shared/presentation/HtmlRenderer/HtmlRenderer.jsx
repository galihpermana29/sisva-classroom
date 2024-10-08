import React from "react";
import parse from "html-react-parser";
import "./style.css";

const HtmlRenderer = ({ htmlContent }) => {
  return (
    <div className="pb-2 text-sm font-normal break-words html-content">
      {parse(htmlContent)}
    </div>
  );
};

export default HtmlRenderer;
