import { Avatar } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import PlaceholderImage from "@/assets/placeholder.jpg";

const StudentCardScore = ({ selected, image, name, score, id }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createParams = (student_id) => {
    const params = new URLSearchParams(searchParams);
    params.set("student_id", student_id);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div
      style={{
        backgroundColor: `${selected ? "#F9F9F9" : "#FFFFFF"}`,
        borderBottom: "solid 1px #D0D5DD",
      }}
    >
      <Link
        href={createParams(id)}
        className="w-full inline-flex p-4 items-center justify-between"
      >
        <div>
          <Avatar src={image || PlaceholderImage.src} size={32} />
          <span className="ml-2 text-xs lg:text-sm text-[#333333]">{name}</span>
        </div>
        <div className="lg:pr-3">
          {score ? (
            <span className="text-xs lg:text-sm text-[#333333]">
              {score}/100
            </span>
          ) : (
            <div className="inline-flex items-center gap-1">
              <div
                className="rounded-md size-[15px] lg:size-[21px] inline-flex justify-center"
                style={{
                  border: "solid 1px #333333",
                }}
              >
                _
              </div>
              <span className="text-xs lg:text-sm text-[#333333]">/100</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default StudentCardScore;
