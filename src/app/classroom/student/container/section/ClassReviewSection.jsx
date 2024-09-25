import { Flex } from "antd";
import CardClass from "../card/CardClass";
import SectionLayout from "../layouts/SectionLayout";

const ClassReviewSection = () => {
  return (
    <SectionLayout title="Tinjauan Kelas">
      <div className="h-[228px] overflow-scroll">
        <Flex className="flex-col lg:flex-row" gap={12}>
          {[...new Array(10)].map((_, index) => (
            <CardClass key={index} />
          ))}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default ClassReviewSection;
