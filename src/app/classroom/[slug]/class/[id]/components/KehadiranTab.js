import FormField from "./FormField"
import PageHeading from "./PageHeading"
import ModalTemplate from "./ModalTemplate"
import ModalActionHorizontal from "./ModalActionHorizontal"
import ModalAbsen from "./ModalAbsen"
import TableTemplate from "./TableTemplate"
import Stack from "@mui/material/Stack"
import { useFormik } from "formik"
import { useState } from "react"
import * as yup from "yup"

const props = {
    name: "kelas",
    type: "select",
    items: [
        {
            value: 1,
            label: "Senin, 30 Januari 2023",
        },
        {
            value: 2,
            label: "Selasa, 30 Januari 2023",
        },
        {
            value: 3,
            label: "Senin, 30 Januari 2023",
        },
        {
            value: 4,
            label: "Senin, 30 Januari 2023",
        },
    ]
}

const siswa = {
    head: [
        {
            id: "Siswa",
        },
        {
            id: "Status",
        }
    ],
    body: [
        {
            nama: "Alwi Sukra",
            status: "Hadir",
            avatar: "/"
        },
        {
            nama: "Rafiul Mahdi",
            status: "Izin",
            avatar: "/"
        },
    ]
}


const KehadiranTab = () => {
    const [open, setOpen] = useState(false)
    const validationSchema = yup.object({})

    const formik = useFormik({
        initialValues: {
            kelas: 1,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })
    return (
        <Stack
            gap={2}
        >
            <PageHeading
                title="List Kehadiran Siswa"
                button
                buttonText="Absen"
                onClick={() => setOpen(true)}
            />
            <ModalTemplate
                title="Absensi"
                subtitle="Selasa, 30 Januari 2023"
                open={open}
                onClose={() => setOpen(false)}
                action={<ModalActionHorizontal />}
            >
                <ModalAbsen />
            </ModalTemplate>
            <FormField
                props={props}
                formik={formik}
                sx={{
                    '& .MuiOutlinedInput-input': {
                        py: "12px",
                    },
                    '& .MuiOutlinedInput-root': {
                        borderRadius: "12px"
                    }
                }}
            />
            <TableTemplate
                head={siswa.head}
                body={siswa.body}
            />
        </Stack>
    )
}

export default KehadiranTab