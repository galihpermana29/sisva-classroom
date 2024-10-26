import { File05, Trash01, UploadCloud02 } from '@untitled-ui/icons-react';
import { Spin, Upload } from 'antd';

import toast from 'react-hot-toast';

const InputFile = ({
  text = 'Upload Tugas',
  onFileSelect,
  fileList,
  setFileList,
  isLoading,
}) => {
  const beforeUpload = (file) => {
    const isAcceptedType = [
      'image/jpeg',
      'image/png',
      'application/pdf',
    ].includes(file.type);

    if (!isAcceptedType) {
      toast.error('You can only upload JPG/PNG/PDF files!');
      return Upload.LIST_IGNORE;
    }

    const isLessThan5MB = file.size / 1024 / 1024 < 5;
    if (!isLessThan5MB) {
      toast.error('File must be smaller than 5MB!');
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
    if (typeof file === 'object' && file !== null) {
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
        <div className="flex flex-row items-center justify-center p-6 gap-2">
          <UploadCloud02 width={32} height={32} className="text-base50 mb-2" />
          <span className="text-sm text-base50 font-kumbh">{text}</span>
        </div>
      </Upload>
      {fileList?.length > 0 && (
        <>
          {isLoading ? (
            <Spin />
          ) : (
            <div className="p-3 rounded-lg mt-2 flex items-center justify-between border border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <File05 width={20} height={20} />
                <span className="text-sm text-gray-600">
                  {getFileName(fileList[0])}
                </span>
              </div>
              <div
                className="flex items-center gap-2 text-red-500 cursor-pointer"
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

export default InputFile;
