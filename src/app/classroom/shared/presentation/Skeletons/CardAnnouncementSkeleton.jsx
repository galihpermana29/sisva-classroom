const CardAnnouncementSkeleton = () => {
  return (
    <div className="flex-none w-full max-w-[312px] lg:max-w-none shadow-card p-4 rounded-xl animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <div className="w-[60px] h-[60px] bg-gray-300 rounded-md"></div>

          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            <div className="max-sm:hidden w-48 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="lg:hidden w-full h-3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default CardAnnouncementSkeleton;
