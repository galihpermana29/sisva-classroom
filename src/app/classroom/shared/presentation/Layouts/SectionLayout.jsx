import { Flex } from "antd";

const SectionLayout = ({ title, suffixContent, children, divider }) => {
  return (
    <div className={`w-full pr-3 lg:shadow-card lg:p-6 lg:rounded-xl`}>
      <Flex justify="space-between">
        <h2 className="block mb-3 text-base font-bold text-base90">{title}</h2>
        {suffixContent}
      </Flex>
      {children}
      {divider && (
        <Flex align="center" className="mt-2 -mb-6 max-sm:hidden">
          <div className="w-2 h-1.5 rounded-full bg-[#2A393F]" />
          <div className="w-full h-[1px] bg-[#2A393F]" />
        </Flex>
      )}
    </div>
  );
};

export default SectionLayout;
