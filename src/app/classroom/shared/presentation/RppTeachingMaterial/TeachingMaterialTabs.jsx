import React from "react";

import TeachingMaterialCardList from "@/app/classroom/(main)/teacher/teaching-material/view/presentation/TeachingMaterialCardList";
import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";

import { useRppTeachingMaterial } from "../../usecase/hooks/use-rpp-teaching-material";

const TeachingMaterialTabs = ({ initialData, type }) => {
  const { materialData, isLoading, queryFilter, handleFilterChange } =
    useRppTeachingMaterial(initialData, type);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-start w-full">
        <SisvaInputSearch
          customSize="md"
          placeholder="Search"
          onChange={(e) => handleFilterChange("search", e.target.value)}
          value={queryFilter.search === "" ? null : queryFilter.search}
        />
      </div>

      <TeachingMaterialCardList
        materialData={materialData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TeachingMaterialTabs;
