import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import CardGridSkeleton from "@/app/classroom/shared/presentation/Skeletons/CardGridSkeleton";
import { Card } from "antd";
import React from "react";
import MaterialCard from "./TeachingMaterialCard/MaterialCard";
import TopicBanner from "./TopicBanner";

const TeachingMaterialCardList = ({ materialData, isLoading }) => {
  if (isLoading) {
    return <CardGridSkeleton />;
  }
  return (
    <div className="flex flex-col gap-8 mt-3">
      {materialData.length > 0 ? (
        <>
          {materialData.map((item, index) => (
            <div key={index} className="flex flex-col gap-5">
              <TopicBanner title={item.topic} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {item.items.map((item, index) => (
                  <MaterialCard item={item} key={index} />
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <Card>
          <EmptyState
            title="Tidak ada bahan ajar"
            description="Tidak ada bahan ajar yang tersedia"
          />
        </Card>
      )}
    </div>
  );
};

export default TeachingMaterialCardList;
