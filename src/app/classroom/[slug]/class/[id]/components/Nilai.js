import Stack from '@mui/material/Stack';
import PageHeading from './PageHeading';
import FormField from './FormField';
import { useFormik } from 'formik';
import TableTemplate from './TableTemplate';

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

const nilai = {
    head: [
        {
            id: "Siswa",
        },
        {
            id: "Nilai",
        }
    ],
    body: [
        {
            icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.04039 9.27992H23.1396L22.266 10.1535C22.0164 10.4031 22.0164 10.8095 22.266 11.0591C22.3908 11.1839 22.554 11.2479 22.7172 11.2479C22.8804 11.2479 23.0436 11.1839 23.1684 11.0591L25.1108 9.11672C25.2324 8.99512 25.2996 8.83512 25.2996 8.66552C25.2996 8.49592 25.2324 8.33272 25.1108 8.21432L23.1684 6.27192C22.9188 6.02232 22.5124 6.02232 22.2628 6.27192C22.0132 6.52152 22.0132 6.92792 22.2628 7.17752L23.0948 7.99992H7.04039C6.68839 7.99992 6.40039 8.28792 6.40039 8.63992C6.40039 8.99192 6.68839 9.27992 7.04039 9.27992Z" fill="#5E5E5E" />
                <path d="M15.0334 12.48C14.3294 12.48 13.7598 13.0496 13.7598 13.7536V24.9696C13.7598 25.6704 14.3294 26.2432 15.0334 26.2432H16.9694C17.6702 26.2432 18.243 25.6736 18.243 24.9696V13.7536C18.243 13.0528 17.6734 12.48 16.9694 12.48H15.0334ZM16.9598 24.96L15.0398 24.9664L15.0334 13.76L16.9598 13.7536V24.96Z" fill="#5E5E5E" />
                <path d="M24.3275 12.48H22.3915C21.6907 12.48 21.1211 13.0496 21.1211 13.7536V24.9696C21.1211 25.6704 21.6907 26.2432 22.3947 26.2432H24.3307C25.0315 26.2432 25.6043 25.6736 25.6043 24.9696V13.7536C25.6011 13.0496 25.0315 12.48 24.3275 12.48ZM24.3211 24.96L22.4011 24.9664L22.3947 13.76L24.3211 13.7536V24.96Z" fill="#5E5E5E" />
                <path d="M7.67399 26.24H9.60999C10.3108 26.24 10.8836 25.6704 10.8836 24.9664V13.7536C10.8836 13.0528 10.314 12.48 9.60999 12.48H7.67399C6.96999 12.48 6.40039 13.0496 6.40039 13.7536V24.9696C6.40039 25.6704 6.96999 26.24 7.67399 26.24ZM9.60039 13.7536V24.96L7.68039 24.9664L7.67399 13.76L9.60039 13.7536Z" fill="#5E5E5E" />
            </svg>
            ,
            textIcon: "Rata-rata Kelas",
            nilai: 99,
        },
        {
            nama: "Alwi Sukra",
            nilai: 98,
            avatar: "/"
        },
        {
            nama: "Rafiul Mahdi",
            nilai: 100,
            avatar: "/"
        },
    ]
}

const Nilai = () => {
    const formik = useFormik({
        initialValues: {
            kelas: 1,
        },
    })

    return (
        <Stack gap={2}>
            <PageHeading
                title="List Nilai Siswa"
            />
            <FormField
                props={props}
                formik={formik}
            />
            <TableTemplate
                head={nilai.head}
                body={nilai.body}
            />
        </Stack>
    )
}

export default Nilai