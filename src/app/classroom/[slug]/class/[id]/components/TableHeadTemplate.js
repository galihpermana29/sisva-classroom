import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCellsTemplate from "./TableCellsTemplate"

const TableHeadTemplate = ({ data }) => {
    return (
        <TableHead>
            <TableRow>
                {data?.map((item, index) => (
                    <TableCellsTemplate
                        data={item}
                        key={index}
                        head
                    />
                ))}
            </TableRow>
        </TableHead>
    )
}

export default TableHeadTemplate