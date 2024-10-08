import React from "react";
import { useParams } from "next/navigation";

import { SisvaInputSearch } from "@/app/classroom/shared/presentation/Input/SisvaInputField";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";
import EmptyState from "@/app/classroom/shared/presentation/EmptyState/EmptyState";
import TeachingPlanTitle from "../../view/presentation/Pane/TeachingPlan/TeachingPlanTitle";
import { useClassAssignment } from "./usecase/hooks/use-class-assignment";
import { ModalProvider } from "../../create-rpp/view/container/Provider/ModalProvider";
import AssignmentContainer from "./view/AssignmentContainer";

const Assignment = () => {
  return (
    <ModalProvider>
      <div className="font-normal text-black">
        <AssignmentContainer />
      </div>
    </ModalProvider>
  );
};

export default Assignment;
