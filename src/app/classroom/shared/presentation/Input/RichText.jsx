import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const SisvaRichText = ({ value, onChange }) => {
  return (
    <ReactQuill
      placeholder="Kegiatan Pembelajaran"
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, false] }],
          [
            "bold",
            "italic",
            "underline",
            "align",
            { list: "ordered" },
            { list: "bullet" },
          ],
          ["image", "link"],
        ],
      }}
    />
  );
};

export default SisvaRichText;
