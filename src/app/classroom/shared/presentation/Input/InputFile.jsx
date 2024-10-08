import { useState } from "react";
import { Upload } from "antd";
import { File05, SearchMd, Trash01 } from "@untitled-ui/icons-react";
import SisvaButton from "../Button/GlobalButton";
import toast from "react-hot-toast";
import Card from "antd/es/card/Card";

const SisvaInputFile = ({
  text = "Upload file here",
  buttonText = "Browse",
  hideButton,
  onFileSelect,
  fileList,
  setFileList,
}) => {
  const beforeUpload = (file) => {
    const isAcceptedType = [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ].includes(file.type);

    if (!isAcceptedType) {
      toast.error("You can only upload JPG/PNG/PDF files!");
      return Upload.LIST_IGNORE;
    }

    const isLessThan5MB = file.size / 1024 / 1024 < 5;
    if (!isLessThan5MB) {
      toast.error("File must be smaller than 5MB!");
      return Upload.LIST_IGNORE;
    }

    setFileList([file]);

    if (onFileSelect) {
      onFileSelect(file);
    }

    return false;
  };

  const onRemove = () => {
    setFileList([]);
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const getFileName = (file) => {
    if (typeof file === "object" && file !== null) {
      return file.name;
    }
    return file;
  };

  return (
    <div className="flex flex-col gap-3">
      <Upload
        name="file"
        multiple={false}
        maxCount={1}
        accept="image/*, .pdf, .doc, .docx"
        type="drag"
        beforeUpload={beforeUpload}
        showUploadList={false}
      >
        <div className="flex flex-col items-center p-4">
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

          <div className="mt-2 text-sm text-gray-500">
            Support for JPG, PNG, GIF, PDF, and DOC. Max file size: 5MB
          </div>
        </div>
      </Upload>
      {fileList?.length > 0 && (
        <div
          className="p-3 rounded-lg mt-2 flex items-center justify-between"
          style={{
            border: "1px solid #E5E7EB",
          }}
        >
          <div className="flex items-center gap-2">
            <File05 width={20} height={20} />
            <span className="text-sm text-[#475467]">
              {getFileName(fileList[0])}
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-primary cursor-pointer"
            onClick={onRemove}
          >
            <Trash01 width={20} height={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SisvaInputFile;
