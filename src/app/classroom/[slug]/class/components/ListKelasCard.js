"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useRouter } from "next/navigation";

const ListKelasCard = ({ data }) => {
  const router = useRouter();

  return (
    <Card
      elevation={2}
      onClick={() => router.push(`/classroom/SEKOLAHSISVA/class/${data.id}`)}
      sx={{ cursor: "pointer", borderRadius:3 }}
    >
      <CardHeader
        avatar={<Avatar sx={{ width: 48, height: 48 }}>S</Avatar>}
        title={
          <Chip
            size="small"
            color="primary"
            sx={{ mb: 0.5 }}
            label={
              <Typography variant="body2" color="white">
                {data.matpel + " - " + data.kelas}
              </Typography>
            }
          />
        }
        subheader={
          <Typography variant="body2" fontWeight={500}>
            {data.guru}
          </Typography>
        }
      />
      <Divider
        sx={{
          borderStyle: "dashed",
          borderColor: "primary.main",
          mx: 2,
        }}
      />
      <CardContent>
        <Stack
          direction="row"
          gap={10}
          sx={{
            "& .MuiListItemText-primary": {
              fontWeight: 600,
            },
          }}
        >
          <Stack>
            <Typography fontSize={12} fontWeight={600}>
              Jadwal
            </Typography>
            <List>
              {data.jadwal.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <Typography variant="body2" sx={{ color: "base.base50" }}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Stack>
          <Stack>
            <Typography fontSize={12} fontWeight={600}>
              Tipe
            </Typography>
            <List>
              <ListItem disablePadding>
                <Typography variant="body2" sx={{ color: "base.base50" }}>
                  {data.tipe}
                </Typography>
              </ListItem>
            </List>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ListKelasCard;
