import { TextareaAutosize, useTheme } from "@mui/material";
import { font } from "@/app/layout";

export const CustomTextArea = ({ formik, name, ...props }) => {
  const theme = useTheme();
  return (
    <TextareaAutosize
      className={`p-2 ${font.className}`}
      id={name}
      name={name}
      value={
        formik?.values && formik?.values[name] ? formik?.values[name] : null
      }
      onChange={formik?.handleChange}
      onBlur={formik?.handleBlur}
      error={formik?.touched[name] && Boolean(formik?.errors[name])}
      style={{
        borderRadius: "0.25rem",
        border: `0.5px solid ${theme.palette.grey[600]}`,
      }}
      minRows={5}
      {...props}
    />
  );
};
