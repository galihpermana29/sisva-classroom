import { useParams } from "next/navigation";

import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import AssignmentListGroup from "./presentation/AssignmentListGroup";
import { useClassAssignment } from "../usecase/hooks/use-class-assignment";

const AssignmentContainer = () => {
  const { id: classId } = useParams();
  const { assignmentGroup, isLoading, filter, handleFilterChange } =
    useClassAssignment(classId);
  return (
    <div>
      <SisvaInputSearch
        customSize="md"
        placeholder="Search"
        value={filter.search === "" ? null : filter.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />

      <AssignmentListGroup assignmentGroup={assignmentGroup} isLoading={isLoading} />
    </div>
  );
};

export default AssignmentContainer;
