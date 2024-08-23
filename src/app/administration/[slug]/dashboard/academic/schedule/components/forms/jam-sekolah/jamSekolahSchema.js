import * as yup from "yup";

export const jamSekolahSchema = yup.object({
  day: yup
    .number("Please enter a valid day!")
    .min(0, { message: "Please enter a valid day!" })
    .required("Day is required!"),
  start_time: yup.string("Enter class start time!"),
  end_time: yup.string("Enter class end time!"),
});
