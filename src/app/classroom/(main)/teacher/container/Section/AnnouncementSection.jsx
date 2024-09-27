"use client";

import React from "react";
import { Flex } from "antd";
import Link from "next/link";

import CardAnnouncement from "@/app/classroom/shared/presentation/Card/CardAnnouncement";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";

import { useGetAllAnnouncements } from "../../usecase/useGetAllAnnouncements";

import AnnouncementImage from "@/assets/images/announcement.png";
import CardAnnouncementSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardAnnouncementSkeleton";

const AnnouncementSection = () => {
  const { data: announcements, isLoading } = useGetAllAnnouncements();

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
          {isLoading ? (
            <CardAnnouncementSkeleton />
          ) : !announcements | announcements.length == 0  (
            announcements.map((announcement, index) => (
              <CardAnnouncement
                image={AnnouncementImage}
                announcementName={announcement.title}
                description={announcement.text}
                key={"announcement" + index}
              />
            ))
          )}
        </Flex>
      </div>
    </SectionLayout>
  );
};

export default AnnouncementSection;
