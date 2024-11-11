import * as yup from "yup";

import {
  formSchoolDetailsFields,
  formSchoolTypeFields,
} from "@/globalcomponents/FormFields";
const validation = {};

for (const field of formSchoolDetailsFields) {
  const { name, label } = field;
  if (name === "abbreviation" || name === "logo_uri") {
    validation[name] = yup.string();
  } else {
    validation[name] = yup.string().required(`${label} is required`);
  }
}

for (const field of formSchoolTypeFields) {
  const { name, label } = field;
  if (name === "kepemilikanSekolah") {
    validation[name] = yup.string().required(`${label} is required`);
  } else {
    validation[name] = yup.string().required(`${label} is required`);
  }
}

validation["theme_json_text"] = yup.string().required(`Theme is required`);
export const schoolProfileFormValidation = yup.object(validation);
