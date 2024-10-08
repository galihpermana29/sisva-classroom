"use client";
import { Button } from "antd";
import "./styles.css";

const SisvaButton = ({
  btn_size = "md",
  btn_type = "primary",
  children,
  iconOnly = false,
  loading = false,
  disabled = false,
  onClick,
  icon,
  htmlType = "button",
  className,
  style,
  block,
  shape = "round",
  ghost,
  danger,
  //   fullRounded = false,
}) => {
  const buttonClassName = `font-semibold app-btn ${btnStyle(btn_type)} ${
    iconOnly ? btnIconSize(btn_size) : btnSize(btn_size)
  } ${className || ""} `;

  return (
    <Button
      type="text"
      rootClassName={buttonClassName}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      icon={icon}
      htmlType={htmlType}
      style={style}
      block={block}
      shape={shape}
      ghost={ghost}
      danger={danger}
    >
      {children}
    </Button>
  );
};

export default SisvaButton;

function btnStyle(type) {
  switch (type) {
    case "primary":
      return "app-btn-primary";
    case "secondary":
      return "app-btn-secondary";
    case "secondary-gray":
      return "app-btn-secondary-gray";
    default:
      return "app-btn-primary";
  }
}

function btnSize(size) {
  switch (size) {
    case "sm":
      return "app-btn-sm";
    case "md":
      return "app-btn-md";
    case "lg":
      return "app-btn-lg";
    case "xl":
      return "app-btn-xl";
    case "2xl":
      return "app-btn-2xl";
    default:
      return "app-btn-md";
  }
}

function btnIconSize(size) {
  switch (size) {
    case "sm":
      return "app-btn-icon-sm";
    case "md":
      return "app-btn-icon-md";
    case "lg":
      return "app-btn-icon-lg";
    case "xl":
      return "app-btn-icon-xl";
    case "2xl":
      return "app-btn-icon-2xl";
    default:
      return "app-btn-icon-md";
  }
}
