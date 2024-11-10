import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";

const TeachingPlanTitle = ({ title, className, prefix }) => {
  const { tokenColor } = useTokenColor();

  return (
    <div
      className={`relative flex items-center w-full h-10 px-2 rounded-md bg-secondary10 ${className}`}
      style={{
        backgroundColor: tokenColor + "20",
      }}
    >
      <div className="absolute top-0 bottom-0 left-0 w-[3px] my-auto  h-[60%] rounded-full" style={{
        backgroundColor: tokenColor
      }} />

      <h2 className="ml-1 text-sm font-medium font-kumbh">{title}</h2>

      <div className="ml-auto">{prefix}</div>
    </div>
  );
};

export default TeachingPlanTitle;
