import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import ModalActionVertical from './ModalActionVertical';
import Divider from '@mui/material/Divider';

const AddResource = ({ onClose }) => {
    const formik = useFormik({
        initialValues: {
            addResource: "",
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <Stack
            p="8px 16px"
            gap={2}
        >
            <Typography variant="body1" fontWeight={600}>
                Resource type
            </Typography>
            <Stack
                component="form"
                onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}
            >
                <RadioGroup
                    name='addResource'
                    value={formik.values.addResource}
                    onChange={formik.handleChange}
                    sx={{
                        '& .MuiFormControlLabel-root': {
                            py: 1
                        }
                    }}
                >
                    <FormControlLabel
                        value={1}
                        label={
                            <Stack direction="row" alignItems="center" gap={2} ml={1}>
                                <Box
                                    component="img"
                                    src="/Home_JadwalPelajaran.svg"
                                    width={40}
                                />
                                <Typography>
                                    Bahan Ajar
                                </Typography>
                            </Stack>
                        }
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value={2}
                        label={
                            <Stack direction="row" alignItems="center" gap={2} ml={1}>
                                <Box
                                    component="img"
                                    src="/Home_PerangkatAjar.svg"
                                    width={40}
                                />
                                <Typography>
                                    Text
                                </Typography>
                            </Stack>
                        }
                        control={<Radio />}
                    />
                    <FormControlLabel
                        value={3}
                        label={
                            <Stack direction="row" alignItems="center" gap={2} ml={1}>
                                <Box
                                    component="img"
                                    src="/Home_Tugas.svg"
                                    width={40}
                                />
                                <Typography>
                                    Tugas
                                </Typography>
                            </Stack>
                        }
                        control={<Radio />}
                    />
                </RadioGroup>
                <Divider />
                <ModalActionVertical onClose={onClose} />
            </Stack>
        </Stack>
    )
}

export default AddResource