import { File05, SearchMd, UploadCloud02 } from "@untitled-ui/icons-react";
import { Upload } from "antd";
import React from "react";
import SisvaButton from "../Button/GlobalButton";
import "./style.css";
const SisvaInputFile = ({
  buttonText = "Browse",
  hideButton,
  text = "Upload file here",
}) => {
  return (
    <Upload.Dragger maxCount={1} type="drag">
      <div className="flex items-center gap-2 justify-center mb-2">
        <File05 width={16} height={16} />
        <span className="ant-upload-text text-[#475467]">{text}</span>
      </div>

      {!hideButton && (
        <SisvaButton
          btn_type="secondary"
          btn_size="md"
          icon={<SearchMd width={16} height={16} />}
          className="!px-10"
        >
          {buttonText}
        </SisvaButton>
      )}
    </Upload.Dragger>
  );
};

export default SisvaInputFile;
