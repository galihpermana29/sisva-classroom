import { Flex } from "antd";
import Image from "next/image";
import AnnouncementImage from "@/assets/images/announcement.png";

const CardAnnouncement = () => {
  return (
    <div className=" flex-none w-full max-w-[312px] lg:max-w-none shadow-card  p-4 rounded-xl">
      <Flex vertical gap={8}>
        <Flex gap={12}>
          <Image
            src={AnnouncementImage}
            alt="announcement"
            className="size-14 rounded-md object-cover overflow-clip "
          />
          <Flex vertical gap={8}>
            <h3 className="pr-3 lg:pr-0 text-sm font-semibold text-base90">
              Teacher’s Best Practice Session
            </h3>
            <p className="max-sm:hidden text-xs text-text_description line-clamp-1 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi, temporibus amet corrupti enim consequatur veniam magni?
              Quaerat non enim rerum recusandae impedit, earum quam ipsam
              quibusdam qui quia fugiat natus facere id dolorum in delectus at,
              eius ab minus? Non ratione expedita deleniti at aliquam dolores
              autem officia temporibus voluptatibus!
            </p>
          </Flex>
        </Flex>
        <p className="lg:hidden text-xs text-text_description line-clamp-2 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          temporibus amet corrupti enim consequatur veniam magni? Quaerat non
          enim rerum recusandae impedit, earum quam ipsam quibusdam qui quia
          fugiat natus facere id dolorum in delectus at, eius ab minus? Non
          ratione expedita deleniti at aliquam dolores autem officia temporibus
          voluptatibus!
        </p>
      </Flex>
    </div>
  );
};

export default CardAnnouncement;
