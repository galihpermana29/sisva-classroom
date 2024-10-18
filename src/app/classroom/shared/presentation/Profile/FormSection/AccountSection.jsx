import { Form } from "antd";
import React from "react";
import { SisvaInput } from "../../Input/SisvaInputField";
import NoDataProvided from "../NoDataProvided";
import { SisvaSelect } from "../../Input/SelectField";
import { useProfileForm } from "../../../usecase/hooks/profile/use-profile-form";
import SisvaButton from "../../Button/GlobalButton";
import { Edit05 } from "@untitled-ui/icons-react";
import PermissionBadge from "../PermissionBadge";

const AccountSection = ({
  form,
  loading,
  isEdit,
  formData,
  isTeacher,
  setIsEdit,
  handleSubmitSection,
  handleCancelEdit,
}) => {
  const { tipeDropdown, aksesDropdown } = useProfileForm();
  return (
    <Form
      form={form}
      name="akun"
      onFinish={(val) => handleSubmitSection(val, "akun")}
      layout="vertical"
      className="w-full"
      disabled={loading}
    >
      <Form.Item name="name" label="Nama">
        {isEdit ? (
          <SisvaInput customSize="md" shadow placeholder="Nama" />
        ) : (
          <span className="text-sm text-text_description">
            {formData?.name ?? <NoDataProvided />}
          </span>
        )}
      </Form.Item>
      <Form.Item name="username" label="Username">
        {isEdit ? (
          <SisvaInput customSize="md" shadow placeholder="Username" disabled />
        ) : (
          <span className="text-sm text-text_description">
            {formData?.username ?? <NoDataProvided />}
          </span>
        )}
      </Form.Item>
      {isTeacher && (
        <>
          <Form.Item name="type" label="Tipe">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={tipeDropdown}
                customSize="md"
                shadow
                placeholder="Pilih Tipe"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.type ?? <NoDataProvided />}
              </span>
            )}
          </Form.Item>
          <Form.Item name="permissions" label="Akses">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                allowClear
                mode="multiple"
                options={aksesDropdown}
                customSize="md"
                shadow
                placeholder="Pilih akses"
              />
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                {formData?.permissions.map((permission, index) => (
                  <PermissionBadge permission={permission} key={index} />
                ))}
              </div>
            )}
          </Form.Item>
        </>
      )}
      {/* Action buttons */}
      <div className="flex justify-end mt-4 gap-2">
        <SisvaButton
          btn_type="secondary"
          onClick={() => (isEdit ? handleCancelEdit() : setIsEdit(true))}
          loading={loading}
          btn_size="lg"
          icon={isEdit ? null : <Edit05 width={20} height={20} />}
        >
          {isEdit ? "Batal" : "Edit"}
        </SisvaButton>
        {isEdit && (
          <SisvaButton
            btn_type="primary"
            loading={loading}
            htmlType="submit"
            btn_size="lg"
          >
            Simpan
          </SisvaButton>
        )}
      </div>
    </Form>
  );
};

export default AccountSection;
