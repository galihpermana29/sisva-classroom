"use client";
import React, { useState } from "react";
import SisvaButton from "../../../../../shared/presentation/Button/GlobalButton";
import { Plus } from "@untitled-ui/icons-react";
import CreateTeachingMaterialModal from "../../../../../shared/presentation/Modal/CreateTeachingMaterialModal";
import TeachingMaterialListFilter from "../presentation/TeachingMaterialListFilter";
import { useTeachingMaterial } from "../../usecase/use-teaching-material";
import TeachingMaterialCardList from "../presentation/TeachingMaterialCardList";

const TeachingMaterialContainer = ({ initialData }) => {
  const {
    materialData,
    dropDownData,
    generalHandleFilter,
    handleResetFilter,
    handleStudyProgramFilter,
    isLoading,
    queryFilter,
  } = useTeachingMaterial(initialData);

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => setIsOpen(true);
  const handleCancel = () => setIsOpen(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:justify-between md:flex-row gap-3">
        <h4 className="text-[#1D2939] text-xl font-bold">List Bahan Ajar</h4>
        <SisvaButton
          btn_type="primary"
          btn_size="md"
          icon={<Plus width={20} height={20} />}
          onClick={showModal}
          className="!w-fit"
        >
          Add Bahan Ajar
        </SisvaButton>
      </div>
      <TeachingMaterialListFilter
        dropDownData={dropDownData}
        generalHandleFilter={generalHandleFilter}
        handleResetFilter={handleResetFilter}
        handleStudyProgramFilter={handleStudyProgramFilter}
        isLoading={isLoading}
        queryFilter={queryFilter}
      />
      <TeachingMaterialCardList
        materialData={materialData}
        isLoading={isLoading}
      />
      <CreateTeachingMaterialModal open={isOpen} handleClose={handleCancel} />
    </div>
  );
};

export default TeachingMaterialContainer;
