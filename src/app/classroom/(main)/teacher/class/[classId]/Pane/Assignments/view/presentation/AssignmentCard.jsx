import React from "react";
import { useModal } from "../../../../create-rpp/view/container/Provider/ModalProvider";
import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";

const AssignmentCard = ({ assignment, assignmentName, desc, deadline }) => {
  const { setModalState } = useModal();

  return (
    <div className="p-4 shadow-card">
      <h3 className="text-xl">{assignmentName}</h3>

      <CardSection title="Deadline">
        <p>{deadline.replace("+00:00", "")}</p>
      </CardSection>

      <CardSection title="Deskripsi">
        <div
          className="h-10 border line-clamp-2"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
      </CardSection>

      <div className="grid grid-cols-2 gap-2 mt-6">
        <SisvaButton
          btn_type="secondary"
          onClick={() =>
            setModalState({ isOpen: true, type: "edit-task", data: assignment })
          }
        >
          Edit
        </SisvaButton>
        <SisvaButton>Detail</SisvaButton>
      </div>
    </div>
  );
};

export default AssignmentCard;

const CardSection = ({ title, children }) => {
  return (
    <div className="mt-4">
      <h3 className="text-xs font-semibold">{title}</h3>
      <div className="grid gap-4 text-sm">{children}</div>
    </div>
  );
};
