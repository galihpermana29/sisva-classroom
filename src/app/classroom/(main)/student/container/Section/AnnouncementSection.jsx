"use client";

import Link from "next/link";
import CardAnnouncement from "@/app/classroom/shared/presentation/Card/CardAnnouncement";
import SectionLayout from "@/app/classroom/shared/presentation/Layouts/SectionLayout";
import AnnouncementImage from "@/assets/images/announcement.png";
import { useGetStudentAnnouncement } from "@/app/classroom/(main)/student/usecase/useGetStudentAnnouncement";
import CardAnnouncementSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardAnnouncementSkeleton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";

const AnnouncementSection = () => {
  const { announcements, isLoading } = useGetStudentAnnouncement();
  return (
    <SectionLayout
      title={"Pengumuman"}
      suffixContent={
        <Link href="" className="text-secondary50 text-xs">
          Lihat lebih
        </Link>
      }
    >
      <div className="lg:h-full lg:max-h-[250px] overflow-auto lg:pr-3 py-1">
        <div className="flex flex-row lg:flex-col p-1 gap-3">
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
