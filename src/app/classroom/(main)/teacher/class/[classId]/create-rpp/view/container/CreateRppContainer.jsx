import React from "react";
import { SisvaInput } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { Divider, Form, Skeleton } from "antd";
import { useCreateRpp } from "../../usecase/use-create-rpp";
import TeachingMaterialTable from "../presentation/Table/TeachingMaterialTable";
import TaskTable from "../presentation/Table/TaskTable";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";

import SisvaRichText from "@/app/classroom/shared/presentation/Input/RichText";
import BoxAction from "../presentation/BoxAction";
import { useModal } from "./Provider/ModalProvider";
import dynamic from "next/dynamic";
import { useCreateRppModalForm } from "../../usecase/use-create-rpp-modal-form";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDeleteRpp } from "../../../usecase/use-delete-rpp";

const FormTaskModal = dynamic(() =>
  import("@/app/classroom/shared/presentation/Modal/FormTaskModal")
);
const CreateTeachingMaterialModal = dynamic(() =>
  import(
    "@/app/classroom/shared/presentation/Modal/CreateTeachingMaterialModal"
  )
);
const SelectTeachingMaterialModal = dynamic(() =>
  import(
    "@/app/classroom/shared/presentation/Modal/SelectTeachingMaterialModal"
  )
);
const DeleteConfirmation = dynamic(() =>
  import("@/app/classroom/shared/presentation/Modal/DeleteConfirmation")
);

const CreateRppContainer = ({ initialData, headerText }) => {
  const router = useRouter();
  const { setModalState, modalState, handleClose } = useModal();
  const {
    handleSubmitForm,
    handleUploadFile,
    isLoadingForm,
    materials,
    tasks,
    handleDeleteRow,
    handleAddFromExistingTeachingMaterial,
    setFileURI,
  } = useCreateRppModalForm();

  const { handleSubmitCreateRPPForm, isLoading, form, isEditRpp } =
    useCreateRpp(initialData);
  const { id } = useParams();
  const { handleDeleteRpp, loadingDelete } = useDeleteRpp(id);
  const classData = useSelector((state) => state.classData.detailClass);

  return (
    <div className="flex flex-col gap-4 font-kumbh">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <h3 className="text-lg font-bold text-[#1D2939]">{headerText}</h3>
        {classData?.isFetching ? (
          <Skeleton.Button
            active
            size="large"
            shape="square"
            block
            className="w-fit"
          />
        ) : (
          <div className="rounded-lg bg-[#FAE1E1] text-[#001C2B] p-2 text-sm font-bold w-fit">
            {classData?.student_group_name}
          </div>
        )}
      </div>
      <p className="text-[#1D2939] font-bold mb-2">Informasi Pembelajaran</p>
      <Form
        form={form}
        layout="vertical"
        name="create-rpp-form"
        onFinish={handleSubmitCreateRPPForm}
        disabled={isLoading}
      >
        <Form.Item
          name="title"
          label="Judul"
          rules={[{ required: true, message: "Title must be filled" }]}
        >
          <SisvaInput customSize="md" placeholder="Nama Rencana Pembelajaran" />
        </Form.Item>
        <Form.Item
          name="markdown"
          label="Deskripsi"
          rules={[{ required: true, message: "Description must be filled" }]}
        >
          <SisvaRichText />
        </Form.Item>
        <Form.Item name="bahan_ajar" label="Bahan Ajar">
          <BoxAction
            onClick={() => {
              setModalState({
                isOpen: true,
                type: "create-teaching-material",
                title: "Tambah Bahan Ajar",
              });
            }}
            onClickButton={() => {
              setModalState({
                isOpen: true,
                type: "select-teaching-material",
                title: "Pilih Bahan Ajar",
              });
            }}
          />
        </Form.Item>
        <div className="my-3">
          <TeachingMaterialTable dataSource={materials} type="summary" />
        </div>
        <Form.Item name="tugas" label="Tugas">
          <BoxAction
            hideButton
            onClick={() => {
              setModalState({
                isOpen: true,
                type: "create-task",
                title: "Tambah Tugas",
              });
            }}
          />
        </Form.Item>
        <div className="my-3">
          <TaskTable dataSource={tasks} />
        </div>
        <p className="text-[#1D2939] font-bold my-3">Informasi Administratif</p>
        <Form.Item
          name="teaching_goal"
          label="Tujuan Pembelajaran"
          rules={[{ required: true, message: "Teaching goals must be filled" }]}
        >
          <SisvaRichText />
        </Form.Item>
        <Form.Item
          name="teaching_activity"
          label="Kegiatan Pembelajaran"
          rules={[
            { required: true, message: "Teaching activity must be filled" },
          ]}
        >
          <SisvaRichText />
        </Form.Item>
        <Form.Item
          name="teaching_scoring"
          label="Penilaian"
          rules={[
            { required: true, message: "Teaching scoring must be filled" },
          ]}
        >
          <SisvaRichText />
        </Form.Item>
        <Divider />
        <div className="flex flex-col gap-3">
          <SisvaButton
            btn_type="secondary-gray"
            customSize="md"
            htmlType="submit"
            loading={isLoading}
          >
            Save Changes
          </SisvaButton>
          {isEditRpp && (
            <SisvaButton
              btn_type="primary"
              customSize="md"
              loading={loadingDelete}
              onClick={() => {
                setModalState({
                  isOpen: true,
                  type: "delete-rpp",
                  title: "Hapus Bahan Ajar dari Rencana Pembelajaran",
                });
              }}
            >
              Delete
            </SisvaButton>
          )}
          <SisvaButton
            btn_type="secondary"
            customSize="md"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </SisvaButton>
        </div>
      </Form>

      {/* MODALS */}
      <FormTaskModal
        open={
          modalState?.isOpen &&
          (modalState?.type === "create-task" ||
            modalState?.type === "edit-task")
        }
        title={modalState?.title}
        handleOk={handleSubmitForm}
        handleFileUpload={handleUploadFile}
        isLoading={isLoadingForm}
        handleClose={handleClose}
        setFileURI={setFileURI}
      />
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
        setFileURI={setFileURI}
      />
      <SelectTeachingMaterialModal
        open={
          modalState?.isOpen && modalState?.type === "select-teaching-material"
        }
        handleClose={handleClose}
        handleOk={handleAddFromExistingTeachingMaterial}
        title={modalState?.title}
        initialData={initialData}
      />
      <DeleteConfirmation
        open={
          modalState?.isOpen &&
          (modalState?.type === "delete-teaching-material" ||
            modalState?.type === "delete-task" ||
            modalState?.type === "delete-rpp")
        }
        title={modalState?.title}
        handleOk={
          modalState?.type === "delete-rpp" ? handleDeleteRpp : handleDeleteRow
        }
        handleClose={handleClose}
        loading={isLoadingForm}
      />
    </div>
  );
};

export default CreateRppContainer;
