import Stack from "@mui/material/Stack"
import DraggableSection from "./DraggableSection"
import TugasCard from "./TugasCard"
import SearchField from "./SearchField"

const items = [
    {
        title: "Tugas 2: Makalah Kalor",
        deadline: "Senin, 12 April 2021",
        deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nisl, vitae ultricies nunc nisl eget nisl. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nisl, vitae ultricies nunc nisl eget nisl.",
        submitted: "Senin, 12 April 2021",
        file : "Tugas2_Makalah.pdf"
    },
    {
        title: "Tugas 1: Teori Kalor",
        deadline: "Senin, 11 April 2021",
        deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nisl, vitae ultricies nunc nisl eget nisl. Sed euismod, nunc sit amet ultricies ultricies, nunc nisl ultricies nisl, vitae ultricies nunc nisl eget nisl.",
    },
]

const Tugas = () => {
    return (
        <Stack gap={2}>
            <SearchField />
            <DraggableSection
                title="Termodinamika"
            />
            {items.map((item, index) => (
                <TugasCard
                    key={index}
                    data={item}
                />
            ))}
        </Stack>
    )
}
export default Tugas