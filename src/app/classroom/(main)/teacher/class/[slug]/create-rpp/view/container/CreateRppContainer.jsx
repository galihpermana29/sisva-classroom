import React from "react";
import SisvaInputFile from "@/app/classroom/shared/presentation/Input/InputFile";
import { SisvaInput } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { Divider, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCreateRpp } from "../../usecase/use-create-rpp";
import TeachingMaterialTable from "../presentation/Table/TeachingMaterialTable";
import TaskTable from "../presentation/Table/TaskTable";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";

import SisvaRichText from "@/app/classroom/shared/presentation/Input/RichText";
import BoxAction from "../presentation/BoxAction";
import { useModal } from "./Provider/ModalProvider";
import dynamic from "next/dynamic";

const FormTaskModal = dynamic(() =>
  import("../../../../../../../shared/presentation/Modal/FormTaskModal")
);
const CreateTeachingMaterialModal = dynamic(() =>
  import(
    "../../../../../../../shared/presentation/Modal/CreateTeachingMaterialModal"
  )
);
const SelectTeachingMaterialModal = dynamic(() =>
  import(
    "../../../../../../../shared/presentation/Modal/SelectTeachingMaterialModal"
  )
);

const CreateRppContainer = () => {
  const [form] = useForm();
  const { setModalState, modalState, handleClose } = useModal();
  const { quillValue, setQuillValue } = useCreateRpp();

  return (
    <div className="flex flex-col gap-4 font-kumbh">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold text-[#1D2939]">
          Tambah Rencana Pembelajaran Kelas:
        </h3>
        <div className="rounded-lg bg-[#FAE1E1] text-[#001C2B] p-2 text-sm font-bold">
          XI MIPA 1
        </div>
      </div>
      <p className="text-[#1D2939] font-bold mb-2">Informasi Pembelajaran</p>
      <Form form={form} layout="vertical" name="create-rpp-form">
        <Form.Item
          name="title"
          label="Judul"
          rules={[{ required: true, message: "Title must be filled" }]}
        >
          <SisvaInput customSize="md" placeholder="Nama Rencana Pembelajaran" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Deskripsi"
          rules={[{ required: true, message: "Description must be filled" }]}
        >
          <SisvaRichText
            value={quillValue.description}
            onChange={(e) => setQuillValue({ ...quillValue, description: e })}
          />
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
          <TeachingMaterialTable />
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
          <TaskTable />
        </div>
        <p className="text-[#1D2939] font-bold my-3">Informasi Administratif</p>
        <Form.Item
          name="goals"
          label="Tujuan Pembelajaran"
          rules={[{ required: true, message: "Goals must be filled" }]}
        >
          <SisvaRichText
            value={quillValue.goals}
            onChange={(e) => setQuillValue({ ...quillValue, goals: e })}
          />
        </Form.Item>
        <Form.Item
          name="activity"
          label="Kegiatan Pembelajaran"
          rules={[{ required: true, message: "Activity must be filled" }]}
        >
          <SisvaRichText
            value={quillValue.activity}
            onChange={(e) => setQuillValue({ ...quillValue, activity: e })}
          />
        </Form.Item>
        <Form.Item
          name="rate"
          label="Penilaian"
          rules={[{ required: true, message: "Rating must be filled" }]}
        >
          <SisvaRichText
            value={quillValue.rate}
            onChange={(e) => setQuillValue({ ...quillValue, rate: e })}
          />
        </Form.Item>
        <Divider />
        <div className="flex flex-col gap-3">
          <SisvaButton btn_type="secondary-gray" customSize="md">
            Save Changes
          </SisvaButton>
          <SisvaButton btn_type="primary" customSize="md">
            Delete
          </SisvaButton>
          <SisvaButton btn_type="secondary" customSize="md">
            Cancel
          </SisvaButton>
        </div>
      </Form>

      {/* MODALS */}
      <FormTaskModal
        open={modalState?.isOpen && modalState?.type === "create-task"}
        handleClose={handleClose}
        handleOk={handleClose}
        title={modalState?.title}
      />
      <CreateTeachingMaterialModal
        open={
          modalState?.isOpen && modalState?.type === "create-teaching-material"
        }
        handleClose={handleClose}
        handleOk={handleClose}
        title={modalState?.title}
      />
      <SelectTeachingMaterialModal
        open={
          modalState?.isOpen && modalState?.type === "select-teaching-material"
        }
        handleClose={handleClose}
        handleOk={handleClose}
        title={modalState?.title}
      />
    </div>
  );
};

export default CreateRppContainer;
