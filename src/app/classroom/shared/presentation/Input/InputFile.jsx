import { File05, SearchMd, Trash01 } from "@untitled-ui/icons-react";
import { Spin, Upload } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTokenColor } from "../../usecase/use-token-color";
import SisvaButton from "../Button/GlobalButton";
import DowndloadableFileLabel from "../DowndloadableFileLabel";

const SisvaInputFile = ({
  text = "Upload file here",
  buttonText = "Browse",
  hideButton,
  onFileSelect,
  fileList,
  setFileList,
  isLoading,
}) => {
  const [generatedFileURI, setGeneratedFileURI] = useState(null);
  const { tokenColor } = useTokenColor();
  const beforeUpload = async (file) => {
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
      const fileId = await onFileSelect(file);
      if (fileId) {
        setGeneratedFileURI(fileId);
      } else setGeneratedFileURI("");
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
            Support for JPG, PNG, PDF. Max file size: 5MB
          </div>
        </div>
      </Upload>
      {fileList?.length > 0 && (
        <>
          {isLoading ? (
            <Spin />
          ) : (
            <div
              className="p-3 rounded-lg mt-2 flex items-center justify-between"
              style={{
                border: "1px solid #E5E7EB",
              }}
            >
              <div className="flex items-center gap-2">
                <File05 width={20} height={20} />
                <DowndloadableFileLabel
                  url={generatedFileURI ? generatedFileURI : fileList[0]}
                >
                  <span className="text-sm text-[#475467] font-semibold hover:text-[#7c7c7c] transition-all">
                    {getFileName(fileList[0])}
                  </span>
                </DowndloadableFileLabel>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                style={{
                  color: tokenColor,
                }}
                onClick={onRemove}
              >
                <Trash01 width={20} height={20} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SisvaInputFile;
