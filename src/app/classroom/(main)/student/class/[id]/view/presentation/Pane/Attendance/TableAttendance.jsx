import { getClientSession } from "@/app/classroom/shared/usecase/session/get-client-session";
import { Avatar, Table } from "antd";
import { Kumbh_Sans } from "next/font/google";
import { useMemo } from "react";
import { formatDateDay } from "../../../../usecase/dateFormatter";
import { useAttendance } from "../../../../usecase/use-attendance";
import BadgeAttendance from "../../../container/BadgeAttendance/BadgeAttendance";

const kumh_sans = Kumbh_Sans({ subsets: ["latin"] });

export default function TableAttendances() {
  const { attendances, loading } = useAttendance();
  const { name, profile_image_uri } = getClientSession();

  const dataSource = useMemo(() => {
    if (!loading && attendances.length > 0) {
      return attendances.map((attendance, index) => ({
        key: index,
        date: attendance.date,
        student_id: attendance.student_id,
        student_name: attendance.student_name,
        status: attendance.status,
      }));
    }
    return [];
  }, [attendances, loading]);

  const columns = useMemo(
    () => [
      {
        title: "Waktu",
        dataIndex: "date",
        key: "date",
        align: "center",
        width: 170,
        render: (text) => (
          <div className="w-fit mx-auto">
            <div className="flex flex-col items-start justify-center ">
              <span className="text-primary100 font-semibold text-sm">
                {formatDateDay(text).day}
              </span>
              <span className="text-xs text-base50 font-normal">
                {formatDateDay(text).fullDate}
              </span>
            </div>
          </div>
        ),
      },
      {
        title: (
          <div className="inline-flex items-center gap-1">
            {/* // ! placeholderImage is not defined */}
            {/* <Avatar src={profile_image_uri || placeholderImage.src} size={30} /> */}
            <span className="text-[#333333] font-normal text-sm">{name}</span>
          </div>
        ),
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (status) => (
          <div className="w-fit mx-auto">
            <BadgeAttendance status={status} />
          </div>
        ),
      },
    ],
    [dataSource]
  );

  return (
    <Table
      bordered
      dataSource={dataSource}
      columns={columns}
      rowClassName="editable-row"
      loading={loading}
      pagination={false}
      className={`${kumh_sans.className}`}
      tableLayout="auto"
    />
  );
}
