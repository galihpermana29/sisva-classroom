import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/material/IconButton';
import Avatar from "@mui/material/Avatar";
import TabPanel from "@/components/tab/TabPanel";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { useState } from "react";
import FormField from "@/components/form/FormField";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/navigation";

const fields = [
    {
        name: "nama",
        labelTop: "Nama Lengkap",
        type: "text",
        placeholder: "Masukkan nama lengkap",
    },
    {
        name: "username",
        labelTop: "Username",
        type: "text",
        placeholder: "Masukkan username",
    },
    {
        name: "kelas",
        labelTop: "Kelas",
        type: "text",
        placeholder: "Masukkan kelas",
    },
    {
        name: "nisn",
        labelTop: "NISN",
        type: "text",
        placeholder: "Masukkan NISN",
    },
    {
        name: "emailSekolah",
        labelTop: "Email Sekolah",
        type: "text",
        placeholder: "Masukkan email sekolah",
    },
]

const Akun = () => {
    const [value, setValue] = useState(0);
    const router = useRouter();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const formik = useFormik({
        initialValues: {
            nama: "",
            username: "",
            kelas: "",
            nisn: "",
            emailSekolah: "",
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <Container>
            <Stack
                direction="row"
                alignItems="center"
                mb={2}
                py={2}
            >
                <IconButton onClick={() => router.back()}>
                    <ArrowBackRoundedIcon />
                </IconButton>
                <Typography fontWeight={600} sx={{ mx: "auto" }}>
                    Akun Saya
                </Typography>
                <Stack width={40} />
            </Stack>
            <Stack alignItems="center" gap={2}>
                <Avatar sx={{ width: 64, height: 64 }}>
                    <AddPhotoAlternateRoundedIcon fontSize="large" />
                </Avatar>
                <Button variant="text" color="primary" fullWidth={false}>
                    Ubah Foto Profil
                </Button>
            </Stack>
            <Divider light sx={{ py: 1 }} />
            <Stack my={2}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    sx={{
                        width: "100%",
                        borderBottom: "1px solid #E5E5E5",
                        '& .MuiTab-root': {
                            p: "16px 12px",
                            fontSize: "12px",
                            minWidth: 64,
                            width: "50%",
                        }
                    }}
                >
                    <Tab label="Info Dasar" />
                    <Tab label="Biodata Diri" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Stack
                        py={2}
                        gap={2}
                        component="form"
                        onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}
                        sx={{
                            '& .MuiButton-root': {
                                borderRadius: 24,
                            }
                        }}
                    >
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                props={field}
                                formik={formik}
                            />
                        ))}
                        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                            Simpan
                        </Button>
                        <Button variant="outlined" onClick={formik.handleReset}>
                            Batal
                        </Button>
                    </Stack>
                </TabPanel>
            </Stack>
        </Container>
    )
}

export default Akun