"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Avatar, Table } from "antd";
import { ConfigProvider } from "antd";
import { Kumbh_Sans } from "next/font/google";
import placeholderImage from "@/assets/placeholder.jpg";
import AverageImage from "@/assets/average-score.png";
import { useGetScores } from "../../../../usecase/use-scores";
import { dateTimeFormatter } from "../../../../usecase/dateFormatter";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

export default function TableScore() {
  const { scores, loading } = useGetScores();
  console.log(scores);

  const dataSource = useMemo(() => {
    if (!loading && scores.data) {
      return scores.data.map((item, index) => ({
        key: index,
        task_name: item.task_name,
        task_start_time: item.task_start_time,
        task_average: item.task_average,
        student_score: item.student_score,
      }));
    }
    return [];
  }, [scores, loading]);

  const columns = useMemo(
    () => [
      {
        title: <div>Tugas</div>,
        dataIndex: "task_name",
        editable: false,
        align: "center",
        width: 170,
        className: `${kumbh.className}`,
        render: (text, record) => (
          <div className="flex flex-col items-start justify-start text-base90 bg-white p-4 -m-4">
            <span className="text-sm font-semibold text-base90">{text}</span>
            <span className="text-base50 font-normal text-xs mt-2 text-left">
              {dateTimeFormatter(record.task_start_time)}
            </span>
          </div>
        ),
      },
      {
        title: (
          <div
            className={`flex items-center justify-center gap-0.5 text-sm font-normal text-[#333333] ${kumbh.className} bg-white p-4 -m-4`}
          >
            <Image
              src={AverageImage}
              alt="average score icon"
              className="size-3.5 lg:size-6"
            />
            <span className="text-xs lg:text-sm text-[#333333]">Rata-rata</span>
          </div>
        ),
        dataIndex: "task_average",
        align: "center",
        className: "text-base90 text-sm bg-[#F9F9F9] font-normal",
        width: 170,
      },
      {
        title: (
          <div
            className={`${kumbh.className} flex items-center justify-center gap-2 font-normal text-base90 bg-white p-4 -m-4`}
          >
            <div>
              <Avatar
                src={scores.userData.student_image || placeholderImage.src}
                size={30}
              />
            </div>
            <span className="text-xs lg:text-sm text-[#333333]">
              {scores.userData.student_name}
            </span>
          </div>
        ),
        dataIndex: "student_score",
        align: "center",
        width: 210,
        className: "text-base90 text-sm bg-[#F9F9F9] font-normal",
      },
    ],
    [scores]
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: "#D0D5DD",
            headerBg: "#fffff",
            headerColor: "#1D2939",
            rowHoverBg: "#f8f9fa",
          },
        },
      }}
    >
      <Table
        dataSource={loading ? [] : dataSource}
        columns={columns}
        pagination={false}
        className={`${kumbh.className} shadow-table  rounded-xl`}
        loading={loading}
        tableLayout="auto"
        bordered
      />
    </ConfigProvider>
  );
}
