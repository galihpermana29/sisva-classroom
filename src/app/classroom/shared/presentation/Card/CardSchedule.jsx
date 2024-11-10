import { useTokenColor } from "../../usecase/use-token-color";
import { BoxTop } from "../Box/Box";

const CardSchedule = ({ time, scheduleName, teacherName }) => {
  const { tokenColor } = useTokenColor();
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-xs font-medium text-[#29292B] w-8">{time}</p>
        <div
          className="w-full p-3 rounded-xl border border-secondary50  shadow-card mr-3 relative overflow-hidden"
          style={{
            border: `1px solid ${tokenColor}`,
            backgroundColor: tokenColor,
          }}
        >
          <BoxTop
            className="size-[104px] -right-5 -top-[75%]"
            rotate={-67.677}
          />
          <div
            className="w-1 h-10 absolute rounded-r-md left-0 top-1/2 -translate-y-1/2"
            style={{
              backgroundColor: tokenColor,
            }}
          ></div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-base font-medium text-white">{scheduleName}</h3>
            <p className="text-xs  text-white">{teacherName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSchedule;
