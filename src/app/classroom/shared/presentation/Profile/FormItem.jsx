import React from "react";
import SisvaButton from "../Button/GlobalButton";
import { Edit05, UserCircle, X } from "@untitled-ui/icons-react";
import { Avatar, Divider, Form, Upload } from "antd";
import { SisvaInput, SisvaInputPassword } from "../Input/SisvaInputField";
import { SisvaSelect } from "../Input/SelectField";
import { useProfileForm } from "../../usecase/hooks/profile/use-profile-form";
import NoDataProvided from "./NoDataProvided";
import AvatarProfile from "./AvatarProfile";
import SkeletonAvatar from "antd/es/skeleton/Avatar";

const FormItem = ({
  imageLoading,
  handleFileUpload,
  formData,
  form,
  isEdit,
  setIsEdit,
  loading,
  step,
  handleChangeSection,
}) => {
  /**
   * step: biodata, akun, password, wali-murid
   */

  const {
    jenisKelaminDropdown,
    agamaDropdown,
    statusDropdown,
    hubunganDropdown,
    aksesDropdown,
    kewarganegaraanDropdown,
    pemasukanBulananDropdown,
    pendidikanTerakhirDropdown,
    tipeDropdown,
    waliMuridDropdown,
  } = useProfileForm();

  return (
    <div className="flex flex-col gap-3">
      <SisvaButton
        btn_type="secondary"
        icon={
          !isEdit ? (
            <Edit05 width={20} height={20} />
          ) : (
            <X width={20} height={20} />
          )
        }
        onClick={() => setIsEdit(!isEdit)}
        className="!w-fit"
        disabled={loading}
      >
        {isEdit ? "Batal" : "Edit"}
      </SisvaButton>

      {step === "biodata" && (
        <Form
          form={form}
          name="biodata"
          onFinish={(val) => handleChangeSection(val, "biodata")}
          layout="vertical"
          className="w-full"
          disabled={loading}
        >
          {imageLoading ? (
            <div className="flex items-center justify-center">
              <SkeletonAvatar size={60} active />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
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
                  <span className="font-semibold text-primary text-sm cursor-pointer">
                    Ubah Foto Profil
                  </span>
                </Upload>
              )}
            </div>
          )}
          <Divider />
          <Form.Item name="email" label="Email">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Email" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.email ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="phone" label="Nomor Telepon">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Nomor Telepon" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.phone ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="gender" label="Jenis Kelamin">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={jenisKelaminDropdown}
                customSize="md"
                shadow
                placeholder="Jenis Kelamin"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.gender ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="nationality" label="Kewarganegaraan">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={kewarganegaraanDropdown}
                customSize="md"
                shadow
                placeholder="Kewarganegaraan"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.nationality ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="personal_id" label="NIK">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="NIK" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.personal_id ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="education_id" label="NUPTK">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="NUPTK" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.education_id ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="religion" label="Agama">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={agamaDropdown}
                customSize="md"
                shadow
                placeholder="Agama"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.religion ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="address" label="Alamat">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Alamat" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.address ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          {isEdit && (
            <div className="flex justify-end mt-4 gap-2">
              <SisvaButton
                btn_type="secondary"
                onClick={() => setIsEdit(false)}
                loading={loading}
              >
                Batal
              </SisvaButton>
              <SisvaButton
                btn_type="primary"
                loading={loading}
                htmlType="submit"
              >
                Simpan
              </SisvaButton>
            </div>
          )}
        </Form>
      )}

      {step === "akun" && (
        <Form
          form={form}
          name="akun"
          onFinish={(val) => handleChangeSection(val, "akun")}
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
              <SisvaInput
                customSize="md"
                shadow
                placeholder="Username"
                disabled
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.username ?? <NoDataProvided />}
              </span>
            )}
          </Form.Item>
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
                {formData?.permissions.map((permissions, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 rounded-full bg-primary text-white font-semibold text-sm"
                  >
                    {permissions}
                  </div>
                ))}
              </div>
            )}
          </Form.Item>
          {isEdit && (
            <div className="flex justify-end mt-4 gap-2">
              <SisvaButton
                btn_type="secondary"
                onClick={() => setIsEdit(false)}
                loading={loading}
              >
                Batal
              </SisvaButton>
              <SisvaButton
                btn_type="primary"
                loading={loading}
                htmlType="submit"
              >
                Simpan
              </SisvaButton>
            </div>
          )}
        </Form>
      )}

      {step === "password" && (
        <Form
          form={form}
          name="password"
          onFinish={(val) => handleChangeSection(val, "password")}
          layout="vertical"
          className="w-full"
          disabled={loading}
        >
          {!isEdit ? (
            <Form.Item name="password" label="Password">
              <span className="text-sm text-text_description">********</span>
            </Form.Item>
          ) : (
            <>
              <Form.Item
                name="password"
                label="Password Baru"
                rules={[
                  {
                    required: true,
                    message: "Silakan masukkan password baru!",
                  },
                ]}
              >
                <SisvaInputPassword
                  customSize="md"
                  shadow
                  placeholder="Password Baru"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Konfirmasi Password Baru"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Silakan konfirmasi password baru!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Kedua password tidak cocok!");
                    },
                  }),
                ]}
              >
                <SisvaInputPassword
                  customSize="md"
                  shadow
                  placeholder="Konfirmasi Password Baru"
                />
              </Form.Item>
              <div className="flex justify-end mt-4 gap-2">
                <SisvaButton
                  btn_type="secondary"
                  onClick={() => setIsEdit(false)}
                  loading={loading}
                >
                  Batal
                </SisvaButton>
                <SisvaButton
                  btn_type="primary"
                  loading={loading}
                  htmlType="submit"
                >
                  Simpan
                </SisvaButton>
              </div>
            </>
          )}
        </Form>
      )}

      {step === "wali-murid" && (
        <Form
          form={form}
          name="wali-murid"
          onFinish={(val) => handleChangeSection(val, "wali-murid")}
          layout="vertical"
          className="w-full"
          disabled={loading}
        >
          <Form.Item name="guardian_type" label="Wali Murid">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={waliMuridDropdown}
                customSize="md"
                shadow
                placeholder="Pilih wali murid"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.guardian_type ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Divider />
          <span className="text-lg font-semibold my-3">Informasi Ayah</span>
          <Form.Item name="father_name" label="Nama">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Nama ayah" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_name ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_email" label="Email">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Email ayah" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_email ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_phone" label="Nomor Telepon">
            {isEdit ? (
              <SisvaInput
                customSize="md"
                shadow
                placeholder="Nomor telepon ayah"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_phone ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_occupation" label="Profesi">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Profesi ayah" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_occupation ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_education" label="Pendidikan Terakhir">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={pendidikanTerakhirDropdown}
                customSize="md"
                shadow
                placeholder="Pendidikan terakhir ayah"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_education ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_income" label="Pemasukan Bulanan">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={pemasukanBulananDropdown}
                customSize="md"
                shadow
                placeholder="Pemasukan bulanan ayah"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_income ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_birth_year" label="Tahun Lahir">
            {isEdit ? (
              <SisvaInput
                customSize="md"
                shadow
                placeholder="Tahun lahir ayah"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_birth_year ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_life_status" label="Status">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={statusDropdown}
                customSize="md"
                shadow
                placeholder="Status ayah"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_life_status ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_religion" label="Agama">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={agamaDropdown}
                customSize="md"
                shadow
                placeholder="Pilih agama ayah"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_religion ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="father_address" label="Alamat">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Alamat ayah" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.father_address ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Divider />
          <span className="text-lg font-semibold my-3">Informasi Ibu</span>
          <Form.Item name="mother_name" label="Nama">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Nama ibu" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_name ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_email" label="Email">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Email ibu" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_email ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_phone" label="Nomor Telepon">
            {isEdit ? (
              <SisvaInput
                customSize="md"
                shadow
                placeholder="Nomor telepon ibu"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_phone ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_occupation" label="Profesi">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Profesi ibu" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_occupation ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_education" label="Pendidikan Terakhir">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={pendidikanTerakhirDropdown}
                customSize="md"
                shadow
                placeholder="Pilih pendidikan terakhir ibu"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_education ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_income" label="Pemasukan Bulanan">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={pemasukanBulananDropdown}
                customSize="md"
                shadow
                placeholder="Pilih pemasukan bulanan ibu"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_income ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_birth_year" label="Tahun Lahir">
            {isEdit ? (
              <SisvaInput
                customSize="md"
                shadow
                placeholder="Tahun lahir ibu"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_birth_year ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_life_status" label="Status">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={statusDropdown}
                customSize="md"
                shadow
                placeholder="Status ibu"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_life_status ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_religion" label="Agama">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={agamaDropdown}
                customSize="md"
                shadow
                placeholder="Pilih agama ibu"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_religion ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="mother_address" label="Alamat">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Alamat ibu" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.mother_address ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Divider />
          <span className="text-lg font-semibold my-3">Informasi Wali</span>
          <Form.Item name="guardian_name" label="Nama">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Nama wali" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.guardian_name ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_gender" label="Jenis Kelamin">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={jenisKelaminDropdown}
                customSize="md"
                shadow
                placeholder="Pilih jenis kelamin wali"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.guardian_gender ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_relationship" label="Hubungan">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={hubunganDropdown}
                customSize="md"
                shadow
                placeholder="Pilih hubungan wali"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text
                  ?.guardian_relationship ?? <NoDataProvided />}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_occupation" label="Profesi">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Profesi wali" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text
                  ?.guardian_occupation ?? <NoDataProvided />}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_education" label="Pendidikan Terakhir">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={pendidikanTerakhirDropdown}
                customSize="md"
                shadow
                placeholder="Pilih pendidikan terakhir wali"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.guardian_education ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_income" label="Pemasukan Bulanan">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={pemasukanBulananDropdown}
                customSize="md"
                shadow
                placeholder="Pilih pemasukan bulanan wali"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.guardian_income ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_phone" label="Nomor Telepon">
            {isEdit ? (
              <SisvaInput
                customSize="md"
                shadow
                placeholder="Nomor telepon wali"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.guardian_phone ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_birth_year" label="Tahun Lahir">
            {isEdit ? (
              <SisvaInput
                customSize="md"
                shadow
                placeholder="Tahun lahir wali"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text
                  ?.guardian_birth_year ?? <NoDataProvided />}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_life_status" label="Status">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={statusDropdown}
                customSize="md"
                shadow
                placeholder="Pilih status wali"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text
                  ?.guardian_life_status ?? <NoDataProvided />}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_religion" label="Agama">
            {isEdit ? (
              <SisvaSelect
                fullRounded={false}
                options={agamaDropdown}
                customSize="md"
                shadow
                placeholder="Pilih agama wali"
              />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.guardian_religion ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          <Form.Item name="guardian_address" label="Alamat">
            {isEdit ? (
              <SisvaInput customSize="md" shadow placeholder="Alamat wali" />
            ) : (
              <span className="text-sm text-text_description">
                {formData?.detail?.json_text?.json_text?.guardian_address ?? (
                  <NoDataProvided />
                )}
              </span>
            )}
          </Form.Item>
          {isEdit && (
            <div className="flex justify-end mt-4 gap-2">
              <SisvaButton
                btn_type="secondary"
                onClick={() => setIsEdit(false)}
                loading={loading}
              >
                Batal
              </SisvaButton>
              <SisvaButton
                btn_type="primary"
                loading={loading}
                htmlType="submit"
              >
                Simpan
              </SisvaButton>
            </div>
          )}
        </Form>
      )}
    </div>
  );
};

export default FormItem;
