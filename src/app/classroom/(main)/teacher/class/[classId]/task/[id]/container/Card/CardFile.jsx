import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import Image from "next/image";
import PDFImage from "@/assets/pdf.png";

const CardFile = ({ file_name, file_type }) => {
  const { school_id } = getClientSession();
  return (
    <a
      href={`${process.env.NEXT_PUBLIC_URL_DOWNLOAD}/${file_name}?school_id=${school_id}`}
    >
      <div
        className="w-full bg-[#F9F9F9] rounded-lg p-4 inline-flex items-center gap-2 "
        style={{
          border: "solid 1px #d0d5dd",
        }}
      >
        <Image src={PDFImage} alt="type file" width={20} />
        <div className="flex flex-col">
          <span className="text-xs font-medium text-base90">{file_name}</span>
          <span className="text-xs font-medium text-base50">{file_type}</span>
        </div>
      </div>
    </a>
  );
};

export default CardFile;
