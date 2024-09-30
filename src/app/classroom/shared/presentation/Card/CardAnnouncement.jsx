import Image from "next/image";

const CardAnnouncement = ({ image, announcementName, description }) => {
  return (
    <div className=" flex-none w-full max-w-[312px] lg:max-w-none shadow-card  p-4 rounded-xl">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <Image
            src={image}
            alt={announcementName}
            width={60}
            height={60}
            className="size-14 rounded-md object-cover overflow-clip "
          />
          <div className="flex flex-col gap-2">
            <h3 className="pr-3 lg:pr-0 text-sm font-semibold text-base90">
              {announcementName}
            </h3>
            <p className="max-sm:hidden text-xs text-text_description line-clamp-1 ">
              {description}
            </p>
          </div>
        </div>
        <p className="lg:hidden text-xs text-text_description line-clamp-2 ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardAnnouncement;
