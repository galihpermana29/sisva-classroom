import React from "react";
import SisvaButton from "../Button/GlobalButton";
import { Edit05, X } from "@untitled-ui/icons-react";
import { Divider, Form } from "antd";
import { SisvaInput, SisvaInputPassword } from "../Input/SisvaInputField";
import { SisvaSelect } from "../Input/SelectField";
import { useProfileForm } from "../../usecase/hooks/use-profile-form";
import DummyProfile from "@/assets/classroom/images/DummyProfile.png";
import Image from "next/image";

const FormItem = ({
  handleSubmit,
  isEdit,
  setIsEdit,
  loading,
  initialData,
  step,
}) => {
  /**
   * step: biodata, akun, password, wali-murid
   */

  const {
    form,
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
  } = useProfileForm(initialData);

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
      >
        {isEdit ? "Batal" : "Edit"}
      </SisvaButton>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="w-full"
      >
        {step === "biodata" && (
          <>
            <div className="flex flex-col items-center justify-center gap-3">
              <Image
                src={DummyProfile}
                alt={"Profile Pic"}
                className="w-16 h-16 rounded-full"
              />
              {isEdit && (
                <span className="font-semibold text-primary text-sm cursor-pointer">
                  Ubah Foto Profil
                </span>
              )}
            </div>
            <Divider />
            <Form.Item name="email" label="Email">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.email}
                </span>
              )}
            </Form.Item>
            <Form.Item name="no_telp" label="Nomor Telepon">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.no_telp}
                </span>
              )}
            </Form.Item>
            <Form.Item name="jenis_kelamin" label="Jenis Kelamin">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={jenisKelaminDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.jenis_kelamin}
                </span>
              )}
            </Form.Item>
            <Form.Item name="kewarganegaraan" label="Kewarganegaraan">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={kewarganegaraanDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.kewarganegaraan}
                </span>
              )}
            </Form.Item>
            <Form.Item name="nik" label="NIK">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.nik}
                </span>
              )}
            </Form.Item>
            <Form.Item name="NUPTK" label="NUPTK">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.NUPTK}
                </span>
              )}
            </Form.Item>
            <Form.Item name="agama" label="Agama">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={agamaDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.agama}
                </span>
              )}
            </Form.Item>
            <Form.Item name="alamat" label="Alamat">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.alamat}
                </span>
              )}
            </Form.Item>
          </>
        )}

        {step === "akun" && (
          <>
            <Form.Item name="name" label="Nama">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.name}
                </span>
              )}
            </Form.Item>
            <Form.Item name="username" label="Username">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.username}
                </span>
              )}
            </Form.Item>
            <Form.Item name="tipe" label="Tipe">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={tipeDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.tipe}
                </span>
              )}
            </Form.Item>
            <Form.Item name="akses" label="Akses">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  allowClear
                  mode="multiple"
                  options={aksesDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  {initialData?.akses.map((akses, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 rounded-full bg-primary text-white font-semibold text-sm"
                    >
                      {akses}
                    </div>
                  ))}
                </div>
              )}
            </Form.Item>
          </>
        )}

        {step === "password" && (
          <>
            {!isEdit ? (
              <Form.Item name="password" label="Password">
                <span className="text-sm text-text_description">********</span>
              </Form.Item>
            ) : (
              <>
                <Form.Item name="password" label="Password Baru">
                  <SisvaInputPassword
                    customSize="md"
                    shadow
                    placeholder="Password Baru"
                  />
                </Form.Item>
                <Form.Item name="password" label="Konfirmasi Password Baru">
                  <SisvaInputPassword
                    customSize="md"
                    shadow
                    placeholder="Konfirmasi Password Baru"
                  />
                </Form.Item>
              </>
            )}
          </>
        )}

        {step === "wali-murid" && (
          <>
            <Form.Item name="wali_murid" label="Wali Murid">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={waliMuridDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.wali_murid}
                </span>
              )}
            </Form.Item>
            <Divider />
            <span className="text-lg font-semibold my-3">Informasi Ayah</span>
            <Form.Item name="nama_ayah" label="Nama">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.nama_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item name="email_ayah" label="Email">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.email_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item name="no_telp_ayah" label="Nomor Telepon">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.no_telp_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item name="profesi_ayah" label="Profesi">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.profesi_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item
              name="pendidikan_terakhir_ayah"
              label="Pendidikan Terakhir"
            >
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={pendidikanTerakhirDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.pendidikan_terakhir_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item name="pemasukan_bulanan_ayah" label="Pemasukan Bulanan">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={pemasukanBulananDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.pemasukan_bulanan_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item name="tahun_lahir_ayah" label="Tahun Lahir">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.tahun_lahir_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item name="status_ayah" label="Status">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={statusDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.status_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item name="agama_ayah" label="Agama">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={agamaDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.agama_ayah}
                </span>
              )}
            </Form.Item>
            <Form.Item name="alamat_ayah" label="Alamat">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.alamat_ayah}
                </span>
              )}
            </Form.Item>
            <Divider />
            <span className="text-lg font-semibold my-3">Informasi Ibu</span>
            <Form.Item name="nama_ibu" label="Nama">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.nama_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item name="email_ibu" label="Email">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.email_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item name="no_telp_ibu" label="Nomor Telepon">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.no_telp_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item name="profesi_ibu" label="Profesi">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.profesi_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item
              name="pendidikan_terakhir_ibu"
              label="Pendidikan Terakhir"
            >
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={pendidikanTerakhirDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.pendidikan_terakhir_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item name="pemasukan_bulanan_ibu" label="Pemasukan Bulanan">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={pemasukanBulananDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.pemasukan_bulanan_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item name="tahun_lahir_ibu" label="Tahun Lahir">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.tahun_lahir_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item name="status_ibu" label="Status">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={statusDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.status_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item name="agama_ibu" label="Agama">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={agamaDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.agama_ibu}
                </span>
              )}
            </Form.Item>
            <Form.Item name="alamat_ibu" label="Alamat">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.alamat_ibu}
                </span>
              )}
            </Form.Item>
            <Divider />
            <span className="text-lg font-semibold my-3">Informasi Wali</span>
            <Form.Item name="nama_wali" label="Nama">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.nama_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="jenis_kelamin_wali" label="Jenis Kelamin">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={jenisKelaminDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.jenis_kelamin_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="hubungan_wali" label="Hubungan">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={hubunganDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.hubungan_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="profesi_wali" label="Profesi">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.profesi_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item
              name="pendidikan_terakhir_wali"
              label="Pendidikan Terakhir"
            >
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={pendidikanTerakhirDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.pendidikan_terakhir_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="pemasukan_bulanan_wali" label="Pemasukan Bulanan">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={pemasukanBulananDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.pemasukan_bulanan_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="no_telp_wali" label="Nomor Telepon">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.no_telp_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="tahun_lahir_wali" label="Tahun Lahir">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.tahun_lahir_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="status_wali" label="Status">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={statusDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.status_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="agama_wali" label="Agama">
              {isEdit ? (
                <SisvaSelect
                  fullRounded={false}
                  options={agamaDropdown}
                  customSize="md"
                  shadow
                />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.agama_wali}
                </span>
              )}
            </Form.Item>
            <Form.Item name="alamat_wali" label="Alamat">
              {isEdit ? (
                <SisvaInput customSize="md" shadow />
              ) : (
                <span className="text-sm text-text_description">
                  {initialData?.alamat_wali}
                </span>
              )}
            </Form.Item>
          </>
        )}

        {isEdit && (
          <div className="flex justify-end mt-4 gap-2">
            <SisvaButton
              btn_type="secondary"
              onClick={() => setIsEdit(false)}
              loading={loading}
            >
              Batal
            </SisvaButton>
            <SisvaButton btn_type="primary" loading={loading} htmlType="submit">
              Simpan
            </SisvaButton>
          </div>
        )}
      </Form>
    </div>
  );
};

export default FormItem;
