import { Avatar, Divider, Form, Upload } from "antd";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import React from "react";
import AvatarProfile from "../AvatarProfile";
import FormItem from "../FormItem";
import { SisvaInput } from "../../Input/SisvaInputField";
import { useProfileForm } from "../../../usecase/hooks/profile/use-profile-form";
import { SisvaSelect } from "../../Input/SelectField";
import SisvaButton from "../../Button/GlobalButton";
import { Edit05 } from "@untitled-ui/icons-react";
import { useTokenColor } from "../../../usecase/use-token-color";

const BiodataSection = ({
  form,
  handleSubmitSection,
  formData,
  loading,
  imageLoading,
  isEdit,
  isTeacher,
  setIsEdit,
  handleFileUpload,
  handleCancelEdit,
}) => {
  const { jenisKelaminDropdown, kewarganegaraanDropdown, agamaDropdown } =
    useProfileForm();
  const { tokenColor } = useTokenColor();
  return (
    <Form
      form={form}
      name="biodata"
      onFinish={(val) => handleSubmitSection(val, "biodata")}
      layout="vertical"
      className="w-full"
      disabled={loading}
    >
      {/* Profile Image Section */}
      <div className="flex flex-col items-center justify-center gap-3 mb-4">
        {imageLoading ? (
          <SkeletonAvatar size={60} active />
        ) : (
          <>
            {formData?.profile_image_uri === "" ? (
              <Avatar size={60} icon={<UserCircle />} />
            ) : (
              <AvatarProfile url={formData?.profile_image_uri} />
            )}
            {isEdit && (
              <Upload
                name="file"
                multiple={false}
                maxCount={1}
                accept="image/*"
                type="select"
                beforeUpload={handleFileUpload}
                showUploadList={false}
              >
                <span
                  className="font-semibold text-sm cursor-pointer"
                  style={{
                    color: tokenColor,
                  }}
                >
                  Ubah Foto Profil
                </span>
              </Upload>
            )}
          </>
        )}
      </div>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormItem
            name="email"
            label="Email"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Email" />
          </FormItem>

          <FormItem
            name="phone"
            label="Nomor Telepon"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Nomor Telepon" />
          </FormItem>

          <FormItem
            name="gender"
            label="Jenis Kelamin"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={jenisKelaminDropdown}
              customSize="md"
              shadow
              placeholder="Jenis Kelamin"
            />
          </FormItem>

          <FormItem
            name="nationality"
            label="Kewarganegaraan"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={kewarganegaraanDropdown}
              customSize="md"
              shadow
              placeholder="Kewarganegaraan"
            />
          </FormItem>
        </div>

        <div>
          <FormItem
            name="personal_id"
            label="NIK"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="NIK" />
          </FormItem>

          <FormItem
            name="education_id"
            label={isTeacher ? "NUPTK" : "NISN"}
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput
              customSize="md"
              shadow
              placeholder={isTeacher ? "NUPTK" : "NISN"}
            />
          </FormItem>

          <FormItem
            name="religion"
            label="Agama"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={agamaDropdown}
              customSize="md"
              shadow
              placeholder="Agama"
            />
          </FormItem>

          <FormItem
            name="address"
            label="Alamat"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Alamat" />
          </FormItem>
        </div>
      </div>
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

export default BiodataSection;
