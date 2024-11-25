import { ModalProvider } from "../../create-rpp/view/container/Provider/ModalProvider";
import AssignmentContainer from "./view/AssignmentContainer";

const AssignmentPane = () => {
  return (
    <ModalProvider>
      <div className="font-normal text-black">
        <AssignmentContainer />
      </div>
    </ModalProvider>
  );
};

export default AssignmentPane;
