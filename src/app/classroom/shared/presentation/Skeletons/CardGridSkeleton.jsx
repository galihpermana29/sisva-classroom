import { Card, Col, Row, Skeleton } from "antd";
import React from "react";

const CardGridSkeleton = () => {
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
};

export default CardGridSkeleton;
