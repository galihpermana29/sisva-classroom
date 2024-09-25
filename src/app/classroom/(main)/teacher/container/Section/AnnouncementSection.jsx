import CardAnnouncement from "@/app/classroom/shared/presentation/Card/CardAnnouncement";
import { Flex } from "antd";
import React from "react";
import AnnouncementImage from "@/assets/images/announcement.png";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import Link from "next/link";

const AnnouncementSection = () => {
    return (
        <SectionLayout
            title={"Pengumuman"}
            suffixContent={
                <Link href="" className="text-xs text-secondary50">
                    Lihat lebih
                </Link>
            }
        >
            <div className="lg:h-[250px] overflow-scroll lg:pr-3 py-1">
                <Flex className="flex-row lg:flex-col " gap={12}>
                    {Array.from({ length: 5 }).map((_, index) => (
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
