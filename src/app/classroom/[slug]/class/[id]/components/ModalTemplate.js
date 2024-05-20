import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import ModalHeader from './ModalHeader'

const ModalTemplate = ({ children, title, subtitle, onClose, open, action }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Paper
                component={Stack}
                maxWidth={340}
                position="absolute"
                width="100%"
                sx={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <ModalHeader
                    title={title}
                    subtitle={subtitle}
                    onClose={onClose}
                />
                {children}
            </Paper>
        </Modal>
    )
}

export default ModalTemplate