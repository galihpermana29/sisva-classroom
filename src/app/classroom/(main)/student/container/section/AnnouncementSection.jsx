import Link from "next/link";
import { Flex } from "antd";
import CardAnnouncement from "@/app/classroom/shared/presentation/Card/CardAnnouncement";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import AnnouncementImage from "@/assets/images/announcement.png";

const AnnouncementSection = () => {
  return (
    <SectionLayout
      title={"Pengumuman"}
      suffixContent={
        <Link href="" className="text-secondary50 text-xs">
          Lihat lebih
        </Link>
      }
    >
      <div className="lg:h-[250px] overflow-scroll lg:pr-3 py-1">
        <Flex className="flex-row lg:flex-col " gap={12}>
          {[...new Array(10)].map((_, index) => (
            <CardAnnouncement
              image={AnnouncementImage}
              announcementName={"Teacher’s Best Practice Session"}
              description={"lorem ipsum"}
              key={index}
            />
          ))}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default AnnouncementSection;
