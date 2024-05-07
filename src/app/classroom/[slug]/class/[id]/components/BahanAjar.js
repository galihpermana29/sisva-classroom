import Stack from "@mui/material/Stack"
import SearchField from "./SearchField"
import BahanCard from "./BahanCard"
import Divider from "@mui/material/Divider"
import DraggableSection from "./DraggableSection"
import Grid from "@mui/material/Grid"

const items = [
    {
        title: "Topik 1",
        materi: [
            {
                matpel: "Matematika",
                title: "Dasar Teori Modul 1: Lorem Ipsum Dolor sit amet, consectetur adipiscing elit.",
                programStudi: "IPA 2022/2023",
                tingkatan: "XI",
            },
            {
                matpel: "Matematika",
                title: "Dasar Teori Modul 1: Lorem Ipsum Dolor sit amet, consectetur adipiscing elitasd.",
                programStudi: "IPA 2022/2023",
                tingkatan: "XI",
            },
            {
                matpel: "Matematika",
                title: "Dasar Teori Modul 1: Lorem Ipsum Dolor sit amet, consectetur adipiscing elit.12321",
                programStudi: "IPA 2022/2023",
                tingkatan: "XI",
            },
        ]
    },
]

const BahanAjar = () => {
    return (
        <Stack gap={2}>
            <SearchField />
            <Stack>
                {items.map((item) => (
                    <Stack
                        key={item.title}
                        gap={2}
                    >
                        <DraggableSection
                            button
                            title={item.title}
                        />
                        <Grid
                            container
                            spacing={2}
                        >
                            {item.materi.map((card) => (
                                <Grid
                                    key={card.title}
                                    item
                                    xs={12}
                                    md={4}
                                >
                                    <BahanCard
                                        data={card}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Divider />
                    </Stack>
                ))}
            </Stack>
        </Stack >
    )
}

export default BahanAjar