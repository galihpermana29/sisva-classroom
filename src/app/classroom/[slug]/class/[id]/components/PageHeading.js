import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const PageHeading = ({ title, button, buttonText, onClick }) => {
    return (
        <Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography fontWeight="700">
                    {title}
                </Typography>
                {button && (
                    <Button
                        fullWidth={false}
                        size="small"
                        variant="contained"
                        onClick={onClick}
                    >
                        {buttonText}
                    </Button>
                )}
            </Stack>
        </Stack>
    )
}

export default PageHeading