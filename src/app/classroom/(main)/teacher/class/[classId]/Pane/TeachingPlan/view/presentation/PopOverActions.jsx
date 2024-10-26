import { DotsVertical } from "@untitled-ui/icons-react";
import { Popover } from "antd";
import { useParams } from "next/navigation";

import Link from "next/link";
import { useDeleteTeachingPlan } from "../../usecase/use-delete-teaching-plan";
import DeleteConfirmationModal from "./DeleteConfirmation";

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

      <DeleteConfirmationModal
        isModalVisible={isModalVisible}
        handleDeleteTeachingPlan={() => handleDeleteTeachingPlan(id)}
        handleCancel={handleCancel}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default PopOverActions;

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
