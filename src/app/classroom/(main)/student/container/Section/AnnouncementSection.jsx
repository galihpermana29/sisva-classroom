"use client";

import Link from "next/link";

import { useGetStudentAnnouncement } from "@/app/classroom/(main)/student/usecase/useGetStudentAnnouncement";
import CardAnnouncement from "@/app/classroom/shared/presentation/Card/CardAnnouncement";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import CardAnnouncementSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardAnnouncementSkeleton";
import { useTokenColor } from "@/app/classroom/shared/usecase/use-token-color";
import AnnouncementImage from "@/assets/images/announcement.png";

const AnnouncementSection = () => {
  const { announcements, isLoading } = useGetStudentAnnouncement();
  const { tokenColor } = useTokenColor();

  return (
    <SectionLayout
      title={"Pengumuman"}
      // suffixContent={
      //   <Link
      //     href=""
      //     className="text-xs text-secondary50"
      //     style={{
      //       color: tokenColor,
      //     }}
      //   >
      //     Lihat lebih
      //   </Link>
      // }
    >
      <div className="lg:h-full lg:max-h-[250px] overflow-auto lg:pr-3 py-1">
        <div className="flex flex-row gap-3 p-1 lg:flex-col">
          {isLoading ? (
            [...new Array(3)].map((_, index) => (
              <CardAnnouncementSkeleton key={index} />
            ))
          ) : announcements.length > 0 ? (
            announcements.map((announcement, index) => (
              <>
                <CardAnnouncement
                  image={AnnouncementImage}
                  announcementName={announcement.title}
                  description={announcement.text}
                  key={index}
                />
              </>
            ))
          ) : (
            <div className="mx-auto">
              <EmptyState
                title="Tidak ada Pengumuman Tersedia!"
                description="Tidak ada pengumuman yang tersedia untuk saat ini."
              />
            </div>
          )}
        </div>
      </div>
    </SectionLayout>
  );
};

export default AnnouncementSection;
