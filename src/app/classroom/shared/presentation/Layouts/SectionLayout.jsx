const SectionLayout = ({ title, suffixContent, children, divider }) => {
  return (
    <div className={`w-full pr-3 lg:shadow-card lg:p-6 lg:rounded-xl`}>
      <div className="flex flex-row justify-between">
        <h2 className="block mb-3 text-base font-bold text-base90">{title}</h2>
        {suffixContent}
      </div>
      {children}
      {divider && (
        <div className="flex items-center mt-2 -mb-4 max-sm:hidden">
          <div className="w-2 h-1.5 rounded-full bg-[#2A393F]" />
          <div className="w-full h-[1px] bg-[#2A393F]" />
        </div>
      )}
    </div>
  );
};

export default SectionLayout;
