import React from "react";
import ClassCard from "./ClassCard";
import EmptyData from "@/app/classroom/shared/presentation/EmptyData";
import { Card, Col, Row, Skeleton } from "antd";
import Link from "next/link";

const ClassListGroup = ({ classData, isLoading }) => {
  if (isLoading) {
    return (
      <Row gutter={[16, 16]} className="py-3">
        {[...Array(6)].map((_, index) => (
          <Col key={index} xs={24} sm={12} xl={8}>
            <Card>
              <Skeleton active />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      {classData.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {classData.map((classItem, idx) => (
            <Link
              key={idx}
              href={`/classroom/teacher/class/${classItem.id}`}
              passHref
            >
              <ClassCard
                group={classItem.student_group_name}
                subject={classItem.subject_name}
                taskName={classItem.task_list[0]?.name}
                timeStamp={classItem.task_list[0]?.deadline}
                isEmptyTask={classItem.task_list.length === 0}
              />
            </Link>
          ))}
        </div>
      ) : (
        <EmptyData
          title="Tidak ada kelas"
          subtitle="Tidak ada kelas yang tersedia untuk saat ini"
        />
      )}
    </div>
  );
};

export default ClassListGroup;
