import { Edit05 } from "@untitled-ui/icons-react";
import { Divider, Form } from "antd";
import React from "react";

import { useProfileForm } from "../../../usecase/hooks/profile/use-profile-form";
import SisvaButton from "../../Button/GlobalButton";
import { SisvaSelect } from "../../Input/SelectField";
import { SisvaInput } from "../../Input/SisvaInputField";
import FormItem from "../FormItem";

const GuardianSection = ({
  form,
  handleSubmitSection,
  loading,
  isEdit,
  formData,
  setIsEdit,
  handleCancelEdit,
}) => {
  const {
    waliMuridDropdown,
    agamaDropdown,
    statusDropdown,
    hubunganDropdown,
    jenisKelaminDropdown,
    pemasukanBulananDropdown,
    pendidikanTerakhirDropdown,
  } = useProfileForm();
  return (
    <Form
      form={form}
      name="wali-murid"
      onFinish={(val) => handleSubmitSection(val, "wali-murid")}
      layout="vertical"
      className="w-full"
      disabled={loading}
    >
      <FormItem
        name="guardian_type"
        label="Wali Murid"
        isEdit={isEdit}
        formData={formData}
      >
        <SisvaSelect
          fullRounded={false}
          options={waliMuridDropdown}
          customSize="md"
          shadow
          placeholder="Pilih wali murid"
        />
      </FormItem>

      <Divider />
      <span className="text-lg font-semibold my-3">Informasi Ayah</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <FormItem
            name="father_name"
            label="Nama"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Nama ayah" />
          </FormItem>

          <FormItem
            name="father_email"
            label="Email"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Email ayah" />
          </FormItem>

          <FormItem
            name="father_phone"
            label="Nomor Telepon"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput
              customSize="md"
              shadow
              placeholder="Nomor telepon ayah"
            />
          </FormItem>
          <FormItem
            name="father_occupation"
            label="Profesi"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Profesi ayah" />
          </FormItem>
          <FormItem
            name="father_education"
            label="Pendidikan Terakhir"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={pendidikanTerakhirDropdown}
              customSize="md"
              shadow
              placeholder="Pendidikan terakhir ayah"
            />
          </FormItem>
        </div>
        <div>
          <FormItem
            name="father_income"
            label="Pemasukan Bulanan"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={pemasukanBulananDropdown}
              customSize="md"
              shadow
              placeholder="Pemasukan bulanan ayah"
            />
          </FormItem>
          <FormItem
            name="father_birth_year"
            label="Tahun Lahir"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Tahun lahir ayah" />
          </FormItem>
          <FormItem
            name="father_life_status"
            label="Status"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={statusDropdown}
              customSize="md"
              shadow
              placeholder="Status ayah"
            />
          </FormItem>

          <FormItem
            name="father_religion"
            label="Agama"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={agamaDropdown}
              customSize="md"
              shadow
              placeholder="Pilih agama ayah"
            />
          </FormItem>
          <FormItem
            name="father_address"
            label="Alamat"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Alamat ayah" />
          </FormItem>
        </div>
      </div>

      <Divider />
      <span className="text-lg font-semibold my-3">Informasi Ibu</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <FormItem
            name="mother_name"
            label="Nama"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Nama ibu" />
          </FormItem>
          <FormItem
            name="mother_email"
            label="Email"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Email ibu" />
          </FormItem>
          <FormItem
            name="mother_phone"
            label="Nomor Telepon"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput
              customSize="md"
              shadow
              placeholder="Nomor telepon ibu"
            />
          </FormItem>

          <FormItem
            name="mother_occupation"
            label="Profesi"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Profesi ibu" />
          </FormItem>
          <FormItem
            name="mother_education"
            label="Pendidikan Terakhir"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={pendidikanTerakhirDropdown}
              customSize="md"
              shadow
              placeholder="Pilih pendidikan terakhir ibu"
            />
          </FormItem>
        </div>
        <div>
          <FormItem
            name="mother_income"
            label="Pemasukan Bulanan"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={pemasukanBulananDropdown}
              customSize="md"
              shadow
              placeholder="Pilih pemasukan bulanan ibu"
            />
          </FormItem>
          <FormItem
            name="mother_birth_year"
            label="Tahun Lahir"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Tahun lahir ibu" />
          </FormItem>
          <FormItem
            name="mother_life_status"
            label="Status"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={statusDropdown}
              customSize="md"
              shadow
              placeholder="Status ibu"
            />
          </FormItem>
          <FormItem
            name="mother_religion"
            label="Agama"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={agamaDropdown}
              customSize="md"
              shadow
              placeholder="Pilih agama ibu"
            />
          </FormItem>
          <FormItem
            name="mother_address"
            label="Alamat"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Alamat ibu" />
          </FormItem>
        </div>
      </div>

      <Divider />
      <span className="text-lg font-semibold my-3">Informasi Wali</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <FormItem
            name="guardian_name"
            label="Nama"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Nama wali" />
          </FormItem>
          <FormItem
            name="guardian_gender"
            label="Jenis Kelamin"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={jenisKelaminDropdown}
              customSize="md"
              shadow
              placeholder="Pilih jenis kelamin wali"
            />
          </FormItem>
          <FormItem
            name="guardian_relationship"
            label="Hubungan"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={hubunganDropdown}
              customSize="md"
              shadow
              placeholder="Pilih hubungan wali"
            />
          </FormItem>
          <FormItem
            name="guardian_occupation"
            label="Profesi"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Profesi wali" />
          </FormItem>
          <FormItem
            name="guardian_education"
            label="Pendidikan Terakhir"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={pendidikanTerakhirDropdown}
              customSize="md"
              shadow
              placeholder="Pilih pendidikan terakhir wali"
            />
          </FormItem>
        </div>
        <div>
          <FormItem
            name="guardian_income"
            label="Pemasukan Bulanan"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={pemasukanBulananDropdown}
              customSize="md"
              shadow
              placeholder="Pilih pemasukan bulanan wali"
            />
          </FormItem>
          <FormItem
            name="guardian_phone"
            label="Nomor Telepon"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput
              customSize="md"
              shadow
              placeholder="Nomor telepon wali"
            />
          </FormItem>
          <FormItem
            name="guardian_birth_year"
            label="Tahun Lahir"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaInput customSize="md" shadow placeholder="Tahun lahir wali" />
          </FormItem>
          <FormItem
            name="guardian_life_status"
            label="Status"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={statusDropdown}
              customSize="md"
              shadow
              placeholder="Pilih status wali"
            />
          </FormItem>
          <FormItem
            name="guardian_religion"
            label="Agama"
            isEdit={isEdit}
            formData={formData}
          >
            <SisvaSelect
              fullRounded={false}
              options={agamaDropdown}
              customSize="md"
              shadow
              placeholder="Pilih agama wali"
            />
          </FormItem>
        </div>
      </div>

      <FormItem
        name="guardian_address"
        label="Alamat"
        isEdit={isEdit}
        formData={formData}
      >
        <SisvaInput customSize="md" shadow placeholder="Alamat wali" />
      </FormItem>
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

export default GuardianSection;
