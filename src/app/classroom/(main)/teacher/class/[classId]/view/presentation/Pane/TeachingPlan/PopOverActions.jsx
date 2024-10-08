import { DotsVertical } from "@untitled-ui/icons-react";
import { Popover } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";

import CustomModal from "./CustomModal";
import { useDeleteTeachingPlan } from "../../../../usecase/hooks/use-delete-teaching-plan";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import TrashIcon from "@/assets/icons/trash.png";
import Link from "next/link";

const PopoverContent = ({ handleOpenModal, isDeleting, id }) => {
  const { classId } = useParams();

  return (
    <div className="flex flex-col -m-2">
      <Link href={`/classroom/teacher/class/${classId}/edit-rpp/${id}`}>
        <button className="flex w-full rounded-md hover:bg-base40/40">
          <span className="text-sm font-medium text-black">Edit</span>
        </button>
      </Link>
      <button
        className="flex w-full rounded-md hover:bg-base40/40"
        onClick={handleOpenModal}
        disabled={isDeleting}
      >
        <span className="text-sm font-medium text-black">Delete</span>
      </button>
    </div>
  );
};

const PopOverActions = ({ id }) => {
  const {
    handleOpenPopup,
    handleOpenModal,
    handleDeleteTeachingPlan,
    handleCancel,
    isDeleting,
    isModalVisible,
    isPopupVisible,
  } = useDeleteTeachingPlan();

  return (
    <div className="h-fit">
      <Popover
        trigger="click"
        open={isPopupVisible}
        onOpenChange={handleOpenPopup}
        content={
          <PopoverContent
            id={id}
            handleOpenModal={handleOpenModal}
            isDeleting={isDeleting}
          />
        }
      >
        <button className="flex items-center justify-center ml-auto size-8">
          <DotsVertical color="#5E5E5E" className="flex-shrink-0 size-5" />
        </button>
      </Popover>

      <DeleteModal
        isModalVisible={isModalVisible}
        handleDeleteTeachingPlan={handleDeleteTeachingPlan}
        handleCancel={handleCancel}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PopOverActions;

const DeleteModal = ({
  isModalVisible,
  handleDeleteTeachingPlan,
  handleCancel,
  isDeleting,
}) => {
  return (
    <CustomModal
      open={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <div className="grid grid-cols-2 gap-2">
          <SisvaButton onClick={handleCancel} btn_type="secondary">
            Batal
          </SisvaButton>
          <SisvaButton
            onClick={() => handleDeleteTeachingPlan(id)}
            disabled={isDeleting}
          >
            Hapus
          </SisvaButton>
        </div>,
      ]}
    >
      <div className="text-center">
        <Image src={TrashIcon} alt="Trash" className="size-36" />

        <h3>Hapus Rencana Pembelajaran</h3>
        <p>Anda akan menghapus rencana pembelajaran. Apakah anda yakin?</p>
      </div>
    </CustomModal>
  );
};
