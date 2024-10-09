import { useParams } from "next/navigation";

import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import FormTaskModal from "@/app/classroom/shared/presentation/Modal/FormTaskModal";
import { useCreateRppModalForm } from "../../../create-rpp/usecase/use-create-rpp-modal-form";
import { useModal } from "../../../create-rpp/view/container/Provider/ModalProvider";
import { useClassAssignment } from "../usecase/hooks/use-class-assignment";
import AssignmentListGroup from "./presentation/AssignmentListGroup";

const AssignmentContainer = () => {
  const { classId } = useParams();
  const { assignments, isLoading, handleFilterChange, filter, refetch } =
    useClassAssignment(classId);
  const { modalState, handleClose } = useModal();

  const {
    handleSubmitForm: generalSubmitHandler,
    handleUploadFile,
    isLoadingForm,
  } = useCreateRppModalForm();

  const handleSubmitForm = async (data) => {
    await generalSubmitHandler(data);
    refetch();
  };

  return (
    <div>
      <SisvaInputSearch
        customSize="md"
        placeholder="Search"
        value={filter.search === "" ? null : filter.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />

      <AssignmentListGroup assignments={assignments} isLoading={isLoading} />
      <FormTaskModal
        open={modalState.isOpen}
        title="Edit Tugas"
        handleOk={handleSubmitForm}
        handleFileUpload={handleUploadFile}
        isLoading={isLoadingForm}
        handleClose={handleClose}
      />
    </div>
  );
};

export default AssignmentContainer;
