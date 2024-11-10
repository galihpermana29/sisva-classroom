"use client";

import React from "react";
import Link from "next/link";
import CardAnnouncement from "@/app/classroom/shared/presentation/Card/CardAnnouncement";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import { useGetAllAnnouncements } from "../../usecase/useGetAllAnnouncements";
import AnnouncementImage from "@/assets/images/announcement.png";
import CardAnnouncementSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardAnnouncementSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";

const AnnouncementSection = () => {
  const { data: announcements, isLoading } = useGetAllAnnouncements();
  const { tokenColor } = useTokenColor();

  return (
    <SectionLayout
      title={"Pengumuman"}
      suffixContent={
        <Link href="" className="text-xs"
          style={{ color: tokenColor }}
        >
          Lihat lebih
        </Link>
      }
    >
      <div className="lg:h-[250px] overflow-scroll lg:pr-3 py-1">
        <div className="flex flex-row gap-3 lg:flex-col ">
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
        </div>
      </div>
    </SectionLayout>
  );
};

export default AnnouncementSection;
