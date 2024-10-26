import { useParams } from "next/navigation";

import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import { useClassAssignment } from "../usecase/hooks/use-class-assignment";
import AssignmentListGroup from "./presentation/AssignmentListGroup";

const AssignmentContainer = () => {
  const { id: classId } = useParams();
  const { assignmentGroups, isLoading, filter, handleFilterChange } =
    useClassAssignment(classId);
  return (
    <div>
      <SisvaInputSearch
        customSize="md"
        placeholder="Search"
        value={filter.search === "" ? null : filter.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
      />

      <AssignmentListGroup assignmentGroups={assignmentGroups} isLoading={isLoading} />
    </div>
  );
};

export default AssignmentContainer;
