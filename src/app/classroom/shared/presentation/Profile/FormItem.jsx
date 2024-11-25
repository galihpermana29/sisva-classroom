import { Form } from "antd";

import NoDataProvided from "./NoDataProvided";

const FormItem = ({ name, label, isEdit, formData, children }) => (
  <Form.Item name={name} label={label}>
    {isEdit ? (
      children
    ) : (
      <span className="text-sm text-text_description">
        {formData?.detail?.json_text?.json_text?.[name] ?? <NoDataProvided />}
      </span>
    )}
  </Form.Item>
);

export default FormItem;
