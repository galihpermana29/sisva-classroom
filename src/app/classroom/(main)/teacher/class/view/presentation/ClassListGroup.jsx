import React from "react";
import ClassCard from "./ClassCard";
import EmptyData from "@/app/classroom/shared/presentation/EmptyData";
import { Card, Col, Row, Skeleton } from "antd";

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
    <div className="bg-white rounded-lg shadow-md p-5">
      {classData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {classData.map((classItem, idx) => (
            <ClassCard
              key={idx}
              group={classItem.student_group_name}
              subject={classItem.subject_name}
              taskName={classItem.task_list[0]?.name}
              timeStamp={classItem.task_list[0]?.deadline}
              isEmptyTask={classItem.task_list.length === 0}
            />
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
