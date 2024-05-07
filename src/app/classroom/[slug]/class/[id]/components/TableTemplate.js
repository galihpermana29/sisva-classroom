import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableHeadTemplate from './TableHeadTemplate'
import TableBodyTemplate from './TableBodyTemplate'

const TableTemplate = ({ head, body }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeadTemplate
                    data={head}
                />
                <TableBodyTemplate
                    data={body}
                />
            </Table>
        </TableContainer>
    )
}

export default TableTemplate