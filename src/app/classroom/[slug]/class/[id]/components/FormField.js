import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

const FormField = ({ props, formik, size, sx }) => {
    return (
        <Stack gap={1} width="100%">
            {props.labelTop && (
                <Typography fontSize={12} fontWeight={600}>
                    {props.labelTop}
                </Typography>
            )}
            <TextField
                {...props}
                select={props.type === "select"}
                value={formik?.values?.[props.name]}
                onChange={formik?.handleChange}
                size={size}
                sx={{
                    ...sx,
                }}
            >
                {props?.items?.map((item) => (
                    <MenuItem
                        key={item.value}
                        value={item.value}
                    >
                        {item.label}
                    </MenuItem>
                ))}
            </TextField>
        </Stack>

    )
}

export default FormField