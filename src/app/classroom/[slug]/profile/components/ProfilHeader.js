import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Link from "next/link";

const ProfilHeader = () => {
  return (
    <Paper
      component={Stack}
      elevation={0}
      p={2}
      gap={3}
      square
      sx={{
        backgroundImage: "url(Pattern.svg)",
        backgroundColor: "#008CD5",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        color: "#FFFFFF",
        borderRadius: { xs: "0px 0px 24px 24px", sm: "24px" },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link href={"/classroom/SEKOLAHSISVA/home"}>
          <IconButton color="inherit">
            <ArrowBackRoundedIcon />
          </IconButton>
        </Link>
        <Typography fontWeight={600}>Profilku</Typography>
        <IconButton color="inherit">
          <MoreVertRoundedIcon />
        </IconButton>
      </Stack>
      <Stack mx="auto" alignItems="center" gap={1.5}>
        <Avatar sx={{ width: 64, height: 64, border: "2px solid #FFFFFF" }} />
        <Stack alignItems="center">
          <Typography fontSize={20} fontWeight={700}>
            Steve Roger
          </Typography>
          <Typography fontSize={14}>@steve_roger</Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack alignItems="center" width="100%">
          <Typography variant="body2" fontWeight={600}>
            Kelas
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            X IPA 1
          </Typography>
        </Stack>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#FFFFFF" }}
        />
        <Stack alignItems="center" width="100%">
          <Typography variant="body2" fontWeight={600}>
            NISN
          </Typography>
          <Typography variant="body2" fontWeight={300}>
            000000
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProfilHeader;
