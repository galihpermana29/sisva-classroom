import Box from '@mui/material/Box'

const TabPanel = ({ value, index, children }) => {
    return (
        <div>
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    )
}

export default TabPanel