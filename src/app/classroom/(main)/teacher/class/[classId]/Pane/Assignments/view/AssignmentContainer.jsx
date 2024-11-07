import { useParams } from "next/navigation";

import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import FormTaskModal from "@/app/classroom/shared/presentation/Modal/FormTaskModal";
import { useModal } from "../../../create-rpp/view/container/Provider/ModalProvider";
import { useClassAssignment } from "../usecase/hooks/use-class-assignment";
import AssignmentListGroup from "./presentation/AssignmentListGroup";
import { useTasksAssignment } from "../usecase/hooks/use-tasks-assignment";

const AssignmentContainer = () => {
  const { classId } = useParams();
  const { assignmentGroups, isLoading, handleFilterChange, filter, refetch } =
    useClassAssignment(classId);
  const { modalState, handleClose } = useModal();

  const {
    handleSubmitForm: generalSubmitHandler,
    handleUploadFile,
    isLoadingForm,
    setFileURI,
  } = useTasksAssignment();

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

      <AssignmentListGroup
        assignmentGroups={assignmentGroups}
        isLoading={isLoading}
      />
      <FormTaskModal
        open={modalState.isOpen}
        title="Edit Tugas"
        handleOk={handleSubmitForm}
        handleFileUpload={handleUploadFile}
        isLoading={isLoadingForm}
        handleClose={handleClose}
        setFileURI={setFileURI}
      />
    </div>
  );
};

export default AssignmentContainer;
