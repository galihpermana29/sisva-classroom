import "./style.css";

import { ChevronDown } from "@untitled-ui/icons-react";
import { Select } from "antd";
import clsx from "clsx";
export function SisvaSelect({
  customSize,
  shadow = false,
  customClassName,
  customPopupClassName,
  fullRounded = true,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  loading,
  mode,
  allowClear,
  showSearch,
  filterOption,
}) {
  let customClass = "";
  if (customSize === "sm") {
    customClass = "h-[40px]";
  } else if (customSize === "md") {
    customClass = "h-[44px]";
  } else if (customSize === "xl") {
    customClass = "h-[60px]";
  }

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
      loading={loading}
      mode={mode}
      allowClear={allowClear}
      showSearch={showSearch}
      filterOption={filterOption}
      suffixIcon={<ChevronDown width={15} height={15} />}
      className={clsx(
        customClass,
        shadow ? "shadow-[0_1px_2px_0px_rgb(16,24,40,0.05)]" : "",
        fullRounded ? "custom-full-rounded-select" : "",
        customClassName
      )}
      popupClassName={clsx(
        customPopupClassName,
        "border border-border-popup",
        "rounded-[8px]"
      )}
    />
  );
}
