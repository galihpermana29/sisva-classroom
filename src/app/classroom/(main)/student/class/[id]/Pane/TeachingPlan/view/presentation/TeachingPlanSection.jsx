import HtmlRenderer from "@/app/classroom/shared/presentation/HtmlRenderer/HtmlRenderer";

const TeachingPlanSection = ({ title, content, htmlContent }) => {
  return (
    <div className="w-full pl-5">
      <div className="flex items-center gap-1 font-kumbh">
        <div className="text-xs font-bold list-disc list-item">{title}</div>
      </div>

      <div>
        {content && <div className="pb-2 text-sm font-normal">{content}</div>}

        {htmlContent && <HtmlRenderer htmlContent={htmlContent} />}
      </div>
    </div>
  );
};

export default TeachingPlanSection;
