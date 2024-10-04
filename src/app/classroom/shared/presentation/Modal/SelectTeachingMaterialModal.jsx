import { Modal } from "antd";
import React, { useState } from "react";
import { SisvaInputSearch } from "../Input/SisvaInputField";
import { SisvaSelect } from "../Input/SelectField";
import TeachingMaterialTable from "../../../(main)/teacher/class/[slug]/create-rpp/view/presentation/Table/TeachingMaterialTable";
import SisvaButton from "../Button/GlobalButton";
import { FilterFunnel01 } from "@untitled-ui/icons-react";

const SelectTeachingMaterialModal = ({
  open,
  handleClose,
  handleOk,
  title,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const FilterContent = () => (
    <>
      <SisvaSelect
        placeholder="Kurikulum"
        customSize="md"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
      />
      <SisvaSelect
        placeholder="Program Studi"
        customSize="md"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
      />
      <SisvaSelect
        placeholder="Mata Pelajaran"
        customSize="md"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
      />
      <SisvaSelect
        placeholder="Tingkatan"
        customSize="md"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
      />
      <SisvaSelect
        placeholder="Guru"
        customSize="md"
        customClassName="w-full md:w-fit mb-2 md:mb-0"
      />
    </>
  );
  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleClose}
      title={title}
      width={940}
      footer={
        <div className="flex justify-end w-full gap-3">
          <SisvaButton btn_type="secondary" btn_size="md" onClick={handleClose}>
            Batal
          </SisvaButton>
          <SisvaButton btn_type="primary" btn_size="md">
            Simpan
          </SisvaButton>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <SisvaInputSearch
            customSize="md"
            placeholder="Search"
            //   onChange={(e) => generalHandleFilter("search", e.target.value)}
            //   value={queryFilter.search === "" ? null : queryFilter.search}
          />
          <div className="lg:hidden">
            <SisvaButton
              btn_size="md"
              btn_type="primary"
              onClick={showModal}
              icon={<FilterFunnel01 width={20} height={20} />}
            >
              Filters
            </SisvaButton>
          </div>
          <div className="hidden lg:flex gap-2">
            <FilterContent />
            <SisvaButton
              btn_type="primary"
              btn_size="md"
              // onClick={handleResetFilter}
            >
              Reset Filter
            </SisvaButton>
          </div>
        </div>

        <Modal
          title="Filter"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <SisvaButton
              btn_type="secondary"
              btn_size="md"
              // onClick={handleResetFilter}
            >
              Reset Filter
            </SisvaButton>,
            <SisvaButton
              btn_type="primary"
              btn_size="md"
              onClick={handleCancel}
            >
              Apply
            </SisvaButton>,
          ]}
        >
          <FilterContent />
        </Modal>

        <TeachingMaterialTable />
      </div>
    </Modal>
  );
};

export default SelectTeachingMaterialModal;
