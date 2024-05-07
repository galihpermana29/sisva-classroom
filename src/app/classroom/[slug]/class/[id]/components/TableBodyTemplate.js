import TableBody from '@mui/material/TableBody'
import TableCellsTemplate from './TableCellsTemplate'
import TableRow from '@mui/material/TableRow'

const TableBodyTemplate = ({ data }) => {
    return (
        <TableBody>
            {data?.map((item, index) => (
                <TableRow key={index}>
                    <TableCellsTemplate
                        data={item}
                    />
                </TableRow>
            ))}
        </TableBody>
    )
}

export default TableBodyTemplate