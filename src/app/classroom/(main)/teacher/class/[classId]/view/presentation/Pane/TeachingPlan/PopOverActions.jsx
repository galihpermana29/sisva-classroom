import { DotsVertical } from "@untitled-ui/icons-react";
import { Popover } from "antd";

import CustomModal from "./CustomModal";
import { useDeleteTeachingPlan } from "../../../../usecase/hooks/use-delete-teaching-plan";

const PopoverContent = ({ handleOpenModal, isDeleting }) => {
  return (
    <div className="flex flex-col -m-2">
      <button className="flex w-full rounded-md hover:bg-base40/40">
        <span className="text-sm font-medium text-black">Edit</span>
      </button>
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
      <CustomModal
        title="Delete Teaching Plan"
        open={isModalVisible}
        onOk={() => handleDeleteTeachingPlan(id)}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn loading={isDeleting}/>
            <OkBtn loading={isDeleting}>Delete</OkBtn>
          </>
        )}
      >
        <p>Are you sure you want to delete this teaching plan?</p>
      </CustomModal>
    </div>
  );
};

export default PopOverActions;
