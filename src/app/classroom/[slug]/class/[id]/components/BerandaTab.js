import Stack from "@mui/material/Stack"
import BerandaKelasCard from "./BerandaKelasCard"
import Divider from "@mui/material/Divider"
import DraggableSection from "./DraggableSection"
import { useState } from "react"
import ModalTemplate from "./ModalTemplate"
import AddResource from "./AddResource"
// import ModalActionVertical from "../modal/action/ModalActionVertical"

const berandaData = [
    {
        topik: "Topik 1",
        title: "Judul 1",
        caption: "Caption 1",
        deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.        ",
        label: ["Label 1", "Label 2", "Label 3"],
        file: ["Modul Bab 1"],
        tugas: ["Tugas 1"]
    },
    {
        topik: "Topik 2",
        title: "Judul 2",
        caption: "Caption 2",
        deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.        ",
        label: ["Label 1", "Label 2", "Label 3"],
        file: ["Modul Bab 2", "Modul Bab 3"],
        tugas: ["Tugas Makalah"]
    },
]

const BerandaTab = () => {
    const [open, setOpen] = useState(false)

    return (
        <Stack gap={2}>
            {berandaData.map((item) => (
                <Stack key={item.topik} gap={2}>
                    <BerandaKelasCard
                        data={item}
                    />
                    <Divider />
                </Stack>
            ))}
            <DraggableSection
                onClick={() => setOpen(true)}
                add
            />
            <ModalTemplate
                open={open}
                onClose={() => setOpen(false)}
                title="Add Resource"
                subtitle="Select a resource to view its help. Double click/tap on an resource name to quickly add it"
            >
                <AddResource onClose={() => setOpen(false)}/>
            </ModalTemplate>
        </Stack>
    )
}

export default BerandaTab