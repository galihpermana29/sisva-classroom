import { Flex } from "antd";
import { BoxTop } from "../box/Box";

const CardSchedule = ({ isEven }) => {
  return (
    <div>
      <Flex align="center" gap={8}>
        <p className="text-xs font-medium text-[#29292B]">07:00</p>
        <div
          className={`w-full p-3 rounded-xl border border-secondary50  shadow-card mr-3 relative overflow-hidden ${
            isEven ? "bg-white" : "bg-secondary50"
          }`}
          style={{
            border: "1px solid var(--Secondary-50, #F96756)",
          }}
        >
          <BoxTop
            className="size-[104px] -right-5 -top-[75%]"
            rotate={-67.677}
          />
          <div
            className={`w-1 h-10 absolute rounded-r-md left-0 top-1/2 -translate-y-1/2 ${
              isEven ? "bg-secondary50" : "bg-secondary70"
            }`}
          ></div>
          <Flex vertical gap={2}>
            <h3
              className={`text-base font-medium ${
                isEven ? " text-base90" : "text-white"
              }`}
            >
              Upacara
            </h3>
            <p className={`text-xs  ${isEven ? " text-base90" : "text-white"}`}>
              Maryam S.Pd
            </p>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default CardSchedule;
