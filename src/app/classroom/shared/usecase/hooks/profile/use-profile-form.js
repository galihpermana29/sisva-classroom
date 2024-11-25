export const useProfileForm = () => {
  const jenisKelaminDropdown = [
    {
      label: "Laki-laki",
      value: "Laki-laki",
    },
    {
      label: "Perempuan",
      value: "Perempuan",
    },
  ];

  const kewarganegaraanDropdown = [
    {
      label: "Warga Negara Indonesia",
      value: "Warga Negara Indonesia",
    },
    {
      label: "Warga Negara Asing",
      value: "Warga Negara Asing",
    },
  ];

  const agamaDropdown = [
    {
      label: "Islam",
      value: "Islam",
    },
    {
      label: "Kristen Protestan",
      value: "Kristen Protestan",
    },
    {
      label: "Kristen Katolik",
      value: "Kristen Katolik",
    },
    {
      label: "Hindu",
      value: "Hindu",
    },
    {
      label: "Budha",
      value: "Budha",
    },
    {
      label: "Konghucu",
      value: "Konghucu",
    },
  ];

  const tipeDropdown = [
    {
      label: "Staf",
      value: "staff",
    },
    {
      label: "Guru",
      value: "teacher",
    },
  ];

  const aksesDropdown = [
    {
      label: "Sekolah",
      value: "manage_school",
    },
    {
      label: "Karyawan",
      value: "manage_staff",
    },
    {
      label: "Akademik",
      value: "manage_academic",
    },
    {
      label: "Siswa",
      value: "manage_student",
    },
    {
      label: "Informasi",
      value: "manage_information",
    },
    {
      label: "Keuangan",
      value: "manage_finance",
    },
  ];

  const waliMuridDropdown = [
    {
      label: "Ayah",
      value: "Ayah",
    },
    {
      label: "Ibu",
      value: "Ibu",
    },
    {
      label: "Wali",
      value: "Wali",
    },
    {
      label: "Murid",
      value: "Murid",
    },
  ];

  const pendidikanTerakhirDropdown = [
    {
      label: "SD",
      value: "SD",
    },
    {
      label: "SMP",
      value: "SMP",
    },
    {
      label: "SMA",
      value: "SMA",
    },
    {
      label: "S1/D3/D4",
      value: "S1/D3/D4",
    },
    {
      label: "S2",
      value: "S2",
    },
    {
      label: "S3",
      value: "S3",
    },
  ];

  const pemasukanBulananDropdown = [
    {
      label: "0 - Rp.1.000.000",
      value: "0 - Rp.1.000.000",
    },
    {
      label: "Rp.1.000.000 - Rp.10.000.000",
      value: "Rp.1.000.000 - Rp.10.000.000",
    },
    {
      label: "Rp.10.000.000 - Rp.50.000.000",
      value: "Rp.10.000.000 - Rp.50.000.000",
    },
    {
      label: "Rp.50.000.000 - Rp.100.000.000",
      value: "Rp.50.000.000 - Rp.100.000.000",
    },
    {
      label: "Rp.100.000.000+",
      value: "Rp.100.000.000+",
    },
  ];

  const statusDropdown = [
    {
      label: "Masih Hidup",
      value: "Masih Hidup",
    },
    {
      label: "Meninggal Dunia",
      value: "Meninggal Dunia",
    },
  ];

  const hubunganDropdown = [
    {
      label: "Orang Tua",
      value: "Orang Tua",
    },
    {
      label: "Kakak/Adik",
      value: "Kakak/Adik",
    },
    {
      label: "Saudara",
      value: "Saudara",
    },
    {
      label: "Teman",
      value: "Teman",
    },
    {
      label: "Suami/Istri",
      value: "Suami/Istri",
    },
    {
      label: "Lainnya",
      value: "Lainnya",
    },
  ];

  return {
    jenisKelaminDropdown,
    kewarganegaraanDropdown,
    agamaDropdown,
    tipeDropdown,
    aksesDropdown,
    waliMuridDropdown,
    pendidikanTerakhirDropdown,
    pemasukanBulananDropdown,
    statusDropdown,
    hubunganDropdown,
  };
};
