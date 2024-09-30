"use client";

import React from "react";
import { Flex } from "antd";
import Link from "next/link";

import CardAnnouncement from "@/app/classroom/shared/presentation/Card/CardAnnouncement";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";

import { useGetAllAnnouncements } from "../../usecase/useGetAllAnnouncements";

import AnnouncementImage from "@/assets/images/announcement.png";
import CardAnnouncementSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardAnnouncementSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";

const AnnouncementSection = () => {
  // const { data: announcements, isLoading } = useGetAllAnnouncements();
  const isLoading = false
  const announcements = []

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
          ) : !announcements | (announcements.length == 0) ? (
            <div className="mx-auto">
              <EmptyState
                title="Belum ada pengumuman"
                description="Tidak ada pengumuman yang tersedia saat ini"
              />
            </div>
          ) : (
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
