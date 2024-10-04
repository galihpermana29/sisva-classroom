"use client";
import React, { Fragment } from "react";
import MaterialCard from "@/app/classroom/(main)/teacher/teaching-material/view/presentation/TeachingMaterialCard/MaterialCard";
import TopicBanner from "@/app/classroom/(main)/teacher/teaching-material/view/presentation/TopicBanner";
import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";

const TeachingMaterialTabs = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex md:justify-end w-full">
        <SisvaInputSearch customSize="md" placeholder="Search" />
      </div>
      <div className="flex flex-col gap-8 mt-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex flex-col gap-5">
            <TopicBanner />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...Array(5)].map((_, index) => (
                <Fragment key={index}>
                  <MaterialCard />
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachingMaterialTabs;
