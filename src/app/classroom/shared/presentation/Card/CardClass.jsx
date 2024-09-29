import { Avatar, Flex, Divider } from "antd";
import { BoxTop } from "@/app/classroom/shared/presentation/Box/Box";

const CardClass = ({
  image,
  lessonName,
  studentClass,
  teacherName,
  taskName,
  deadline,
}) => {
  return (
    <div className="flex-none bg-secondary50 p-3 rounded-xl relative overflow-hidden w-full lg:w-fit">
      <BoxTop className="size-[104px] -right-5 -top-12" rotate={-67.677} />
      <Flex gap={16}>
        <Avatar src={image} size={48} />
        <Flex vertical gap={10}>
          <h2 className="text-[#F96756] text-sm font-semibold bg-secondary10 rounded-full px-2 py-0.5">
            {lessonName} - {studentClass}
          </h2>
          <p className="text-white font-semibold text-sm">{teacherName}</p>
        </Flex>
      </Flex>
      <Divider
        variant="dashed"
        className="border border-secondary20 border-spacing-1"
        type="horizontal"
      />
      <h3 className="text-base10 text-xs font-semibold mb-2">Daftar Tugas</h3>
      <div className="w-[280px] lg:w-[265px] p-3 rounded-xl border shadow-card mr-3  bg-white relative">
        <div className="w-1 h-10 absolute rounded-r-md left-0 top-1/2 -translate-y-1/2 bg-secondary50"></div>
        <Flex vertical gap={2}>
          <h4 className="text-base text-base90 font-medium">{taskName}</h4>
          <p className="text-base90 text-xs ">{deadline}</p>
        </Flex>
      </div>
    </div>
  );
};

export default CardClass;
