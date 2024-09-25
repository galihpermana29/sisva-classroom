import { Flex } from "antd";

const SectionLayout = ({ title, suffixContent, children, divider }) => {
  return (
    <div className="lg:shadow-card lg:p-6 lg:rounded-xl w-full ">
      <Flex justify="space-between">
        <h2 className="text-base text-base90 font-bold block mb-3">{title}</h2>
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
