import { File05, SearchMd } from "@untitled-ui/icons-react";
import React from "react";

import SisvaButton from "@/app/classroom/shared/presentation/Button/GlobalButton";

const BoxAction = ({
  onClick,
  onClickButton,
  hideButton,
  text = "Create new",
  buttonText = "Or select from existing",
}) => {
  const handleClickButton = (e) => {
    e.stopPropagation();
    onClickButton();
  };
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex justify-center items-center w-full h-32 rounded-lg border-dashed border border-[#D0D5DD] hover:border-[#85868a]"
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2">
          <File05 width={17} height={17} />
          {text}
        </div>
        {!hideButton && (
          <SisvaButton
            btn_type="secondary"
            btn_size="md"
            icon={<SearchMd width={18} height={18} />}
            onClick={handleClickButton}
          >
            {buttonText}
          </SisvaButton>
        )}
      </div>
    </div>
  );
};

export default BoxAction;
