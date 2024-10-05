import React from "react";
import SisvaButton from "../../../../../shared/presentation/Button/GlobalButton";
import { Plus } from "@untitled-ui/icons-react";
import TeachingMaterialListFilter from "../presentation/TeachingMaterialListFilter";
import { useTeachingMaterial } from "../../usecase/use-teaching-material";
import TeachingMaterialCardList from "../presentation/TeachingMaterialCardList";
import { useModal } from "../../../class/[slug]/create-rpp/view/container/Provider/ModalProvider";
import { useTeachingMaterialForm } from "../../usecase/use-teaching-material-form";
import dynamic from "next/dynamic";

const CreateTeachingMaterialModal = dynamic(() =>
  import("../../../../../shared/presentation/Modal/CreateTeachingMaterialModal")
);

const DeleteConfirmation = dynamic(() =>
  import("@/app/classroom/shared/presentation/Modal/DeleteConfirmation")
);
const TeachingMaterialContainer = ({ initialData }) => {
  const {
    materialData,
    dropDownData,
    generalHandleFilter,
    handleResetFilter,
    handleStudyProgramFilter,
    isLoading,
    queryFilter,
    setQueryFilter,
  } = useTeachingMaterial(initialData);

  const { modalState, setModalState, handleClose } = useModal();
  const {
    handleSubmitForm,
    handleDeleteTeachingMaterial,
    handleUploadFile,
    isLoadingForm,
  } = useTeachingMaterialForm(setQueryFilter);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:justify-between md:flex-row gap-3">
        <h4 className="text-[#1D2939] text-xl font-bold">List Bahan Ajar</h4>
        <SisvaButton
          btn_type="primary"
          btn_size="md"
          icon={<Plus width={20} height={20} />}
          onClick={() => {
            setModalState({
              isOpen: true,
              title: "Tambah Bahan Ajar",
              type: "create-teaching-material",
            });
          }}
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

      {/* MODALS */}
      <CreateTeachingMaterialModal
        open={
          modalState?.isOpen &&
          (modalState?.type === "create-teaching-material" ||
            modalState?.type === "edit-teaching-material")
        }
        title={modalState?.title}
        handleOk={handleSubmitForm}
        handleFileUpload={handleUploadFile}
        isLoading={isLoadingForm}
        handleClose={handleClose}
        initialData={initialData}
      />
      <DeleteConfirmation
        open={
          modalState?.isOpen && modalState?.type === "delete-teaching-material"
        }
        title={modalState?.title}
        handleOk={handleDeleteTeachingMaterial}
        handleClose={handleClose}
        loading={isLoadingForm}
      />
    </div>
  );
};

export default TeachingMaterialContainer;
