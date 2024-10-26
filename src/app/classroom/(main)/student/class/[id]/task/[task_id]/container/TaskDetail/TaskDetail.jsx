"use client";

import { Divider } from "antd";
import parse from "html-react-parser";
import { dateFormatterDayName } from "../../usecase/dateFormatter";
import CardFile from "../Card/CardFile";
import InfoItem from "../InfoItem/InfoItem";
import SkeletonDetailTask from "../Skeleton/SkeletonDetailTask";

export default function TaskDetail({ task, loading }) {
  if (loading) {
    return <SkeletonDetailTask />;
  }
  return (
    <div className="bg-white p-4 rounded-xl shadow-card">
      <h1 className="text-xl font-bold text-base90">{task.task_name}</h1>
      <div className="mt-5 flex justify-between">
        <InfoItem title="Guru" content={task.teacher_name} />
        <InfoItem
          title="Deadline"
          content={dateFormatterDayName(task.task_deadline)}
        />
        <InfoItem
          title="Tipe Submission"
          content={
            task.task_allow_submission
              ? "Allow Submission"
              : "Not Allow Submission"
          }
        />
      </div>
      <Divider type="horizontal" className="bg-base40" />
      <div className="w-full mb-5">
        <h2 className="text-xs font-semibold text-base90">Deskripsi</h2>
        <p className="text-sm text-[#333333]">{parse(task.task_description)}</p>
      </div>
      <CardFile file_name={task.task_file} file_type={""} />
    </div>
  );
}
